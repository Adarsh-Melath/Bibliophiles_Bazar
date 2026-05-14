package com.backend.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.CategoryRequestDto;
import com.backend.application.dto.CategoryResponseDto;
import com.backend.application.service.CategoryService;
import com.backend.domain.model.pagination.PageResult;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
// @PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<PageResult<CategoryResponseDto>> getCategories(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(categoryService.getCategories(keyword, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategory(id));
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDto> addCategory(
            @RequestBody @Valid CategoryRequestDto request) {
        log.debug("add category controller called ");
        log.debug("category name  : {} ", request.getName());
        log.debug("category description : {}", request.getDescription());
        return ResponseEntity.status(201).body(categoryService.addCategory(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category Deleted Successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable Long id,
            @RequestBody @Valid CategoryRequestDto request) {
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }
}