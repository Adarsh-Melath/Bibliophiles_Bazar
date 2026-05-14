package com.backend.domain.model;

public final class BookImage {
    private Long id;
    private String imageUrl;
    private boolean primary;
    private Integer sortOrder;

    public BookImage(Long id, String imageUrl, boolean primary, Integer sortOrder) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.primary = primary;
        this.sortOrder = sortOrder;
    }

    public Long getId(

    ) {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isPrimary() {
        return primary;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

}
