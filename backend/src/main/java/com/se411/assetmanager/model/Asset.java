package com.se411.assetmanager.model;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.relational.core.mapping.Table;

@Table("asset")
public record Asset(
        @Id Long id,
        @NotBlank String name,
        @NotBlank String brand,
        @NotBlank String model,
        @NotBlank String status,
        String assignedTo,
        @NotBlank String purchaseDate) {
}
