package com.backend.application.exception.vendorexception;

public class VendorNotFoundException extends RuntimeException {
    public VendorNotFoundException(String message) {
        super(message);
    }
}
