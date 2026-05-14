package com.backend.application.service;

import org.springframework.stereotype.Service;

import com.backend.application.dto.AdminUserResponse;
import com.backend.application.dto.UpdateProfileRequest;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public PageResult<AdminUserResponse> getUsers(String search, String role, int page, int size) {
        PageQuery query = new PageQuery(page, size);
        Role roleEnum = (role != null && !role.isBlank()) ? Role.valueOf(role) : null;

        PageResult<User> users;
        if (search != null && !search.isBlank() && roleEnum != null) {
            users = userRepository.searchByNameOrEmailAndRole(search, roleEnum, query);
        } else if (search != null && !search.isBlank()) {
            users = userRepository.searchByNameOrEmail(search, query);
        } else if (roleEnum != null) {
            users = userRepository.findByRole(roleEnum, query);
        } else {
            users = userRepository.findAll(query);
        }

        return users.map(this::toAdminResponse);
    }

    public void toggleBlock(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Cannot block an admin user");
        }

        if (user.isBlocked()) {
            user.unblock();
        } else {
            user.block();
        }
        userRepository.save(user);
    }

    public void updateUser(Long id, UpdateProfileRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Cannot edit an admin user");
        }

        user.update(request.getName(), request.getPhone());
        userRepository.save(user);
    }

    private AdminUserResponse toAdminResponse(User user) {
        return new AdminUserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProvider().name(), user.isEnabled(), user.isBlocked(), user.getCreatedAt());
    }
}
