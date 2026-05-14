package com.backend.shared.util;

public class SlugUtil {
    public static String generateSlug(String categoryName) {
        if (categoryName == null || categoryName.isEmpty()) {
            return "";
        }

        return categoryName.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "") // Remove special chars
                .replaceAll("\\s+", " ") // Collapse spaces
                .trim()
                .replace(" ", "-");
    }
}
