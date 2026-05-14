package com.backend.application.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.application.dto.CategoryRequestDto;
import com.backend.application.dto.CategoryResponseDto;
import com.backend.application.exception.categoryException.CategoryAlreadyFoundException;
import com.backend.application.exception.categoryException.CategoryNotFoundException;
import com.backend.application.exception.categoryException.InactiveCategoryException;
import com.backend.domain.model.Category;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.repository.CategoryRepository;
import com.backend.shared.util.SlugUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryResponseDto addCategory(CategoryRequestDto request) {
        Optional<Category> category = categoryRepository.findByName(request.getName());

        if (category.isPresent())
            throw new CategoryAlreadyFoundException("Category Already Exists");
        Category newCategory = Category.create(
                request.getName(),
                request.getDescription(),
                SlugUtil.generateSlug(request.getName()));

        return toCategoryResponseDto(categoryRepository.save(newCategory));
    }

    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto request) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        if (!existingCategory.isActive())
            throw new InactiveCategoryException("Cannot update an inactive category");

        existingCategory.update(
                request.getName(),
                request.getDescription(),
                SlugUtil.generateSlug(request.getName()));

        return toCategoryResponseDto(categoryRepository.save(existingCategory));

    }

    public void deleteCategory(Long id) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        existingCategory.softDelete();
        categoryRepository.save(existingCategory);
    }

    public PageResult<CategoryResponseDto> getCategories(String keyword, int page, int size) {
        PageQuery query = new PageQuery(page, size);
        PageResult<Category> categories;

        if (keyword != null && !keyword.isBlank())
            categories = categoryRepository.search(keyword, query);
        else
            categories = categoryRepository.findAll(query);
        return categories.map(this::toCategoryResponseDto);
    }

    public CategoryResponseDto getCategory(Long id) {
        return toCategoryResponseDto(
                categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category not found")));
    }

    private CategoryResponseDto toCategoryResponseDto(Category category) {
        return new CategoryResponseDto(category.getId(), category.getName(), category.getSlug(),
                category.getDescription(),
                category.isActive(), category.getCreatedAt());
    }
}
