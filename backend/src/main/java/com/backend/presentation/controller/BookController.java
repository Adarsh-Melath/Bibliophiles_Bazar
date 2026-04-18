package com.backend.presentation.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.BookRequest;
import com.backend.application.dto.BookResponse;
import com.backend.application.service.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vendor/books")
public class BookController {
    private final BookService bookService;

    // Get current vendor's email from JWT
    private String getEmail(Authentication auth) {
        return auth.getName(); // Spring sets this from JWT subject
    }

    @PostMapping
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<BookResponse> addBook(
            Authentication auth,
            @RequestBody @Valid BookRequest request) {
        return ResponseEntity.status(201).body(bookService.addBook(getEmail(auth), request));
    }

    @GetMapping
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<Page<BookResponse>> getMyBooks(
            Authentication auth,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(bookService.getMyBooks(getEmail(auth), search, page, size));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<BookResponse> getBook(Authentication auth, @PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBook(getEmail(auth), id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<BookResponse> updateBook(Authentication auth, @PathVariable Long id,
            @RequestBody @Valid BookRequest request) {
        return ResponseEntity.ok(bookService.updateBook(getEmail(auth), id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<String> deleteBook(Authentication auth, @PathVariable Long id) {
        bookService.deleteBook(getEmail(auth), id);
        return ResponseEntity.ok("Book deleted");
    }
}
