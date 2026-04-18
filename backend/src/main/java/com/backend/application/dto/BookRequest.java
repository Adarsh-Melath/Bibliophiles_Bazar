package com.backend.application.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank
    String title;
    @NotBlank
    String author;
    @NotBlank
    String isbn;
    @NotBlank
    String category;
    @NotBlank
    String description;
    @NotNull
    @DecimalMin("0.01")
    BigDecimal price;
    @NotNull
    @Min(0)
    Integer stock;
    String coverImageUrl;
    String language;
    Integer pages;
    LocalDate publishedDate;
}
