package com.backend.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.infrastructure.persistence.entity.CategoryEntity;

public interface JpaCategoryRepository extends JpaRepository<CategoryEntity, Long> {

  CategoryEntity save(CategoryEntity e);

  Page<CategoryEntity> findByDeletedFalse(Pageable pageable);

  Optional<CategoryEntity> findByNameAndDeletedFalse(String name);

  Optional<CategoryEntity> findById(Long id);

  Page<CategoryEntity> findByNameContainingIgnoreCaseAndDeletedFalse(String keyword, Pageable pageable);
}