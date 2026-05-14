package com.backend.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.domain.model.Role;
import com.backend.infrastructure.persistence.entity.UserEntity;

public interface JpaUserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<UserEntity> findAll(Pageable pageable);

    @Query("SELECT u FROM UserEntity u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<UserEntity> searchByNameOrEmail(@Param("search") String search, Pageable pageable);

    Page<UserEntity> findByRole(Role role, Pageable pageable);

    @Query("SELECT u FROM UserEntity u WHERE (:role IS NULL OR u.role = :role) AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<UserEntity> searchByNameOrEmailAndRole(@Param("search") String search, @Param("role") Role role,
            Pageable pageable);

}
