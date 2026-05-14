package com.backend.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookRequest {
    Long categoryId;
    @NotBlank
    String title;
    @NotBlank
    String author;
    @NotBlank
    String isbn;
    @NotBlank
    String description;
    @NotNull
    @DecimalMin("0.01")
    BigDecimal price;
    @NotNull
    @Min(0)
    Integer stock;
    @Size(min = 3)
    List<BookImageRequest> images;
    String language;
    Integer pages;
    LocalDate publishedDate;
}
