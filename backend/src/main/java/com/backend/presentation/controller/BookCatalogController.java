package com.backend.presentation.controller;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.BookResponse;
import com.backend.application.service.BookService;
import com.backend.domain.model.ProductSort;
import com.backend.domain.model.pagination.BookSearchQuery;
import com.backend.domain.model.pagination.PageResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")

public class BookCatalogController {

    private final BookService bookService;

    @GetMapping("/search")
    public ResponseEntity<PageResult<BookResponse>> searchBooks(@RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "NEWEST") ProductSort sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        BookSearchQuery query = new BookSearchQuery(keyword, categoryId, minPrice, maxPrice, sort, page, size);

        log.debug("Entered the controller");

        return ResponseEntity.ok(bookService.searchBooks(query));
    }
}
