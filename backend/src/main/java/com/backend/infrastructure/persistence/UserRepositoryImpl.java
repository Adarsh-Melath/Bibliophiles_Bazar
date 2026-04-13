package com.backend.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import com.backend.domain.model.User;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpa;

    @Override
    public  User save(User user) {
        return jpa.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpa.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

}
