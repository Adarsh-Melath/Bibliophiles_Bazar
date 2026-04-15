package com.backend.application.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.application.dto.AdminUserResponse;
import com.backend.domain.model.User;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public Page<AdminUserResponse> getUsers(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<User> users;
        if (search != null && !search.isBlank()) {
            users = userRepository.searchByNameOrEmail(search, pageable);
        } else {
            users = userRepository.findAll(pageable);
        }

        return users.map(this::toAdminResponse);
    }

    public void toggleBlock(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Cannot block an admin user");
        }

        user.setBlocked(!user.isBlocked());
        userRepository.save(user);
    }

    private AdminUserResponse toAdminResponse(User user) {
        return new AdminUserResponse(user.getId(), user.getName(), user.getEmail(),
                user.getRole().name(), user.getProvider().name(),
                user.isEnabled(), user.isBlocked(), user.getCreatedAt());
    }
}
