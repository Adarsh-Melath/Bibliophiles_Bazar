package com.backend.infrastructure.persistence;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpa;

    @Override
    public User save(User user) {
        return jpa.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpa.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpa.findById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return jpa.findAll(pageable);
    }

    @Override
    public Page<User> searchByNameOrEmail(String search, Pageable pageable) {
        return jpa.searchByNameOrEmail(search, pageable);
    }

    @Override
    public Page<User> findByRole(Role role, Pageable pageable) {
        return jpa.findByRole(role, pageable);
    }

    @Override
    public Page<User> searchByNameOrEmailAndRole(String search, Role role, Pageable pageable) {
        return jpa.searchByNameOrEmailAndRole(search, role, pageable);
    }
}
