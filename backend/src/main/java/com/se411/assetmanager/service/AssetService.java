package com.se411.assetmanager.service;

import com.se411.assetmanager.model.Asset;
import com.se411.assetmanager.repository.AssetRepository;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AssetService {
    private final AssetRepository repository;

    public AssetService(AssetRepository repository) {
        this.repository = repository;
    }

    public Asset add(Asset asset) {
        return repository.save(new Asset(null, asset.name(), asset.brand(), asset.model(),
                asset.status(), asset.assignedTo(), asset.purchaseDate()));
    }

    public Optional<Asset> getById(Long id) {
        return repository.findById(id);
    }

    public Page<Asset> getAll(int page, int size) {
        return repository.findAll(PageRequest.of(page, size, Sort.by("id")));
    }

    public boolean update(Long id, Asset changes) {
        if (repository.findById(id).isEmpty()) {
            return false;
        }
        Asset updated = new Asset(id, changes.name(), changes.brand(), changes.model(),
                changes.status(), changes.assignedTo(), changes.purchaseDate());
        repository.save(updated);
        return true;
    }

    public boolean delete(Long id) {
        if (repository.findById(id).isEmpty()) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
