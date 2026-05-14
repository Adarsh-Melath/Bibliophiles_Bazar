package com.backend.domain.model;

import java.util.regex.Pattern;

public class ISBN {
    private static final Pattern ISBN13_PATTERN = Pattern
            .compile("^(?:\\d{12}\\d|[\\d|-]{1,5}-\\d{1,7}-\\d{1,6}-\\d)$");
    private final String value;

    private ISBN(String value) {
        this.value = value;
    }

    public static ISBN from(String rawIsbn) {
        if (rawIsbn == null || rawIsbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN cannot be empty or null");
        }
        if (!ISBN13_PATTERN.matcher(rawIsbn).matches()) {
            throw new IllegalArgumentException("Invalid ISBN format: " + rawIsbn);
        }

        return new ISBN(rawIsbn.trim());
    }

    public String getValue() {
        return value;
    }
}
