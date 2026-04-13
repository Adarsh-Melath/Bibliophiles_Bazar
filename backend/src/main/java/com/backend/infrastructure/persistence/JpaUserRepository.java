package com.backend.infrastructure.persistence;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.User;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
