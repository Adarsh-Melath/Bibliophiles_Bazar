package com.backend.application.exception.categoryException;

public class InactiveCategoryException extends RuntimeException {
    public InactiveCategoryException(String message) {
        super(message);
    }
}
