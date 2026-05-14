package com.backend.presentation;

import java.util.Map;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import org.springframework.web.bind.annotation.ExceptionHandler;

import com.backend.application.exception.StorageException;
import com.backend.application.exception.bookexception.BookNotFoundException;
import com.backend.application.exception.categoryException.CategoryAlreadyFoundException;
import com.backend.application.exception.categoryException.CategoryNotFoundException;
import com.backend.application.exception.categoryException.InactiveCategoryException;
import com.backend.application.exception.vendorexception.VendorNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(VendorNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleVendorNotFoundException(VendorNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBookNotFoundException(BookNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(InactiveCategoryException.class)
    public ResponseEntity<Map<String, String>> handleInactiveCategoryException(InactiveCategoryException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(CategoryAlreadyFoundException.class)
    public ResponseEntity<Map<String, String>> handleCategoryAlreadyFoundException(CategoryAlreadyFoundException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleCategoryNotFoundException(CategoryNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(errors);
    }

    @ExceptionHandler(StorageException.class)
    public ResponseEntity<Map<String, String>> handleStorage(StorageException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "File upload failed. Please try again."));
    }
}