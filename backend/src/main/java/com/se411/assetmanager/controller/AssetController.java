package com.se411.assetmanager.controller;

import com.se411.assetmanager.model.Asset;
import com.se411.assetmanager.service.AssetService;
import java.net.URI;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> add(@Valid @RequestBody Asset request, UriComponentsBuilder builder) {
        if (request.id() != null) {
            return ResponseEntity.badRequest().build();
        }
        Asset saved = service.add(request);
        URI location = builder.path("/api/assets/{id}").buildAndExpand(saved.id()).toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> findById(@PathVariable Long id) {
        Optional<Asset> asset = service.findById(id);

        if (asset.isPresent()) {
            return ResponseEntity.ok(asset.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Asset>> findAll(Pageable pageable) {
        if (pageable.getPageNumber() < 0 || pageable.getPageSize() > 100) {
            return ResponseEntity.badRequest().build();
        }
        Page<Asset> page = service.getAll(
            pageable.getPageNumber(),
            pageable.getPageSize()
        );
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable @Positive Long id, @Valid @RequestBody Asset request) {
        if (request.id() != null) {
            return ResponseEntity.badRequest().build();
        }
        if (!service.update(id, request)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
