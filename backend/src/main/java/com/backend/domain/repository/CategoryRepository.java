package com.backend.domain.repository;

import java.util.Optional;

import com.backend.domain.model.Category;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;

public interface CategoryRepository {
    Category save(Category save);

    PageResult<Category> findAll(PageQuery query);

    Optional<Category> findByName(String name);

    Optional<Category> findById(Long id);

    PageResult<Category> search(String key, PageQuery query);
}
