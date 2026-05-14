package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.backend.domain.model.Category;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.repository.CategoryRepository;
import com.backend.infrastructure.persistence.entity.CategoryEntity;
import com.backend.infrastructure.persistence.jpa.JpaCategoryRepository;
import com.backend.infrastructure.persistence.mapper.CategoryMapper;
import com.backend.infrastructure.persistence.mapper.PageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepository {
    private final JpaCategoryRepository jpaCategory;

    private Pageable buildPageable(PageQuery query) {
        return PageRequest.of(query.getPage(), query.getSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Override
    public Category save(Category c) {

        CategoryEntity e = CategoryMapper.toEntity(c);
        CategoryEntity savedEntity = jpaCategory.save(e);
        Category domainEntity = CategoryMapper.toDomain(savedEntity);
        return domainEntity;
    }

    @Override
    public PageResult<Category> findAll(PageQuery query) {
        Pageable pageable = buildPageable(query);

        Page<Category> page = jpaCategory.findByDeletedFalse(pageable).map(CategoryMapper::toDomain);
        return PageMapper.toPageResult(page);
    }

    @Override
    public Optional<Category> findByName(String name) {
        return jpaCategory.findByNameAndDeletedFalse(name).map(CategoryMapper::toDomain);
    }

    @Override
    public Optional<Category> findById(Long id) {
        return jpaCategory.findById(id).map(CategoryMapper::toDomain);
    }

    @Override
    public PageResult<Category> search(String keyword, PageQuery query) {
        Pageable pageable = buildPageable(query);

        Page<Category> page = jpaCategory.findByNameContainingIgnoreCaseAndDeletedFalse(keyword, pageable)
                .map(CategoryMapper::toDomain);
        return PageMapper.toPageResult(page);

    }
}
