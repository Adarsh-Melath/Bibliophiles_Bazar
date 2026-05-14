package com.backend.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.backend.domain.model.BookImage;
import com.backend.domain.model.ISBN;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookResponse {
    Long id;
    Long vendorId;
    Long categoryId;
    String title;
    String author;
    String isbn;
    String description;
    BigDecimal price;
    Integer stock;
    List<BookImageResponse> images;
    String language;
    Integer pages;
    LocalDate publishedDate;
    String status;
    LocalDateTime createdAt;
}
