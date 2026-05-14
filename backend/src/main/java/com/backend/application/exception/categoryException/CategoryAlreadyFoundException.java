package com.backend.application.exception.categoryException;

public class CategoryAlreadyFoundException extends RuntimeException {
    public CategoryAlreadyFoundException(String message) {
        super(message);
    }
}
