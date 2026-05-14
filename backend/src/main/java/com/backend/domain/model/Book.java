package com.backend.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public final class Book {
    private Long id;

    private Long vendorId;

    private Long categoryId;

    private String title;

    private String author;

    private ISBN isbn;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private List<BookImage> images;

    private String language;

    private Integer pages;

    private LocalDate publishedDate;

    private BookStatus status;

    private boolean deleted;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    public Book(Long id, Long vendorId, Long categoryId, String title, String author, ISBN isbn, String description,
            BigDecimal price, Integer stock, List<BookImage> images, String language, Integer pages,
            LocalDate publishedDate, BookStatus status, boolean deleted, LocalDateTime createdAt,
            LocalDateTime updatedAt, LocalDateTime deletedAt) {
        this.id = id;
        this.vendorId = vendorId;
        this.categoryId = categoryId;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.images = images;
        this.language = language;
        this.pages = pages;
        this.publishedDate = publishedDate;
        this.status = status;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    private static void validateImages(List<BookImage> images) {
        if (images == null || images.size() < 3)
            throw new IllegalArgumentException("Minimum 3 Images required ");
    }

    private static void validate(String title, String author, String description, BigDecimal price,
            Integer stock, Integer pages) {
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("Book title can't be null");

        if (author == null || author.isBlank())
            throw new IllegalArgumentException("Book author can't be null ");

        if (description == null || description.isBlank())
            throw new IllegalArgumentException("Book description cannot be null");

        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Book price must be greater than or equal to 0");
        }

        if (stock == null || stock < 0)
            throw new IllegalArgumentException("Book stock must be greater than or equal to 0");

        if (pages == null || pages < 0)
            throw new IllegalArgumentException("Book pages must be greater than or equal to 0 ");

    }

    public static Book create(Long vendorId, Long categoryId, String title, String author, ISBN isbn,
            String description,
            BigDecimal price, Integer stock, List<BookImage> images, String language, Integer pages,
            LocalDate publishedDate) {

        validate(title, author, description, price, stock, pages);
        validateImages(images);
        return new Book(null, vendorId, categoryId, title, author, isbn, description, price, stock, List.copyOf(images),
                language,
                pages, publishedDate, BookStatus.ACTIVE, false, LocalDateTime.now(), null, null);
    }

    public void update(String title, String author, ISBN isbn, String description, BigDecimal price,
            Integer stock, List<BookImage> images, String language, Integer pages) {
        validate(title, author, description, price, stock, pages);
        validateImages(images);
        if (this.deleted) {
            throw new IllegalArgumentException("Cannot updated deleted book");
        }
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.images = List.copyOf(images);
        this.language = language;
        this.pages = pages;
        this.updatedAt = LocalDateTime.now();
    }

    public void softDelete() {
        if (this.deleted) {
            return;
        }
        this.status = BookStatus.DELETE;
        this.deletedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void changeStock(Integer stock) {
        if (stock == null || stock < 0)
            throw new IllegalArgumentException("Book stock must be greater than or equal to 0");

        this.stock = stock;
        this.updatedAt = LocalDateTime.now();
    }

    public void changePrice(BigDecimal price) {
        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Book price must be greater than or equal to 0");
        }

        this.price = price;
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getVendorId() {
        return vendorId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public ISBN getIsbn() {
        return isbn;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public List<BookImage> getImages() {
        return images;
    }

    public String getLanguage() {
        return language;
    }

    public Integer getPages() {
        return pages;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public BookStatus getStatus() {
        return status;
    }

    public boolean isDeleted() {
        return this.deleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
}