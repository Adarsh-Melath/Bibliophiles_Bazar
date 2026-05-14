package com.backend.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class CategoryRequestDto {
    @NotBlank(message = "Name is required")
    @Size(min=2 , max = 100)
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 500)
    private String description;

}
