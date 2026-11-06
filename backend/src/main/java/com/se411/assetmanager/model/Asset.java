package com.se411.assetmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("ASSET")
public record Asset(
        @Id Long id,
        String name,
        String brand,
        String model,
        String status,
        String assignedTo,
        String purchaseDate) {
}
