package com.se411.assetmanager.controller;

import com.se411.assetmanager.model.Asset;
import com.se411.assetmanager.service.AssetService;
import java.net.URI;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    private final AssetService service;

    public AssetController(AssetService service) {
        this.service = service;
    }

    private boolean invalid(Asset a) {
        return a == null || blank(a.name()) || blank(a.brand()) || blank(a.model())
                || blank(a.status()) || blank(a.purchaseDate());
    }

    private boolean blank(String text) {
        return text == null || text.isBlank();
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody Asset request, UriComponentsBuilder builder) {
        if (invalid(request)) return ResponseEntity.badRequest().build();
        Asset saved = service.add(request);
        URI location = builder.path("/api/assets/{id}").buildAndExpand(saved.id()).toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> findById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Asset>> findAll(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size) {
        if (page < 0 || size < 1 || size > 100) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(service.getAll(page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Asset request) {
        if (invalid(request)) return ResponseEntity.badRequest().build();
        if (!service.update(id, request)) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.delete(id)) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }
}
