
package com.backend.domain.repository;

import com.backend.domain.model.User;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository {

    User save(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean existsByEmail(String email);

    Page<User> findAll(Pageable pageable);

    Page<User> searchByNameOrEmail(String search, Pageable pageable);

}
