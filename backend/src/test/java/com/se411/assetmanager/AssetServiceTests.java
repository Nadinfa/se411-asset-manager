package com.se411.assetmanager;

import com.se411.assetmanager.model.Asset;
import com.se411.assetmanager.repository.AssetRepository;
import com.se411.assetmanager.service.AssetService;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AssetServiceTests {
    private AssetRepository repository;
    private AssetService service;
    private Asset sample;

    @BeforeEach
    void setup() {
        repository = Mockito.mock(AssetRepository.class);
        service = new AssetService(repository);
        sample = new Asset(1L, "MacBook", "Apple", "M3", "Available", "", "2026-01-01");
    }

    @Test
    void addAsset() {
        when(repository.save(any(Asset.class))).thenReturn(sample);
        assertEquals(1L, service.add(sample).id());
        verify(repository).save(any(Asset.class));
    }

    @Test
    void addDoesNotSupplyClientId() {
        when(repository.save(any(Asset.class))).thenAnswer(call -> call.getArgument(0));
        assertNull(service.add(sample).id());
    }

    @Test
    void findExistingAsset() {
        when(repository.findById(1L)).thenReturn(Optional.of(sample));
        assertEquals("MacBook", service.findById(1L).orElseThrow().name());
    }

    @Test
    void findMissingAsset() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertTrue(service.findById(99L).isEmpty());
    }

    @Test
    void returnsPageOfAssets() {
        Page<Asset> page = new PageImpl<>(List.of(sample));
        when(repository.findAll(any(PageRequest.class))).thenReturn(page);
        assertEquals(1, service.getAll(0, 5).getContent().size());
        verify(repository).findAll(PageRequest.of(0, 5, Sort.by("id")));
    }

    @Test
    void updatesExistingAsset() {
        when(repository.findById(1L)).thenReturn(Optional.of(sample));
        when(repository.save(any(Asset.class))).thenReturn(sample);
        assertTrue(service.update(1L, sample));
        verify(repository).save(any(Asset.class));
    }

    @Test
    void missingAssetCannotUpdate() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertFalse(service.update(99L, sample));
        verify(repository, never()).save(any(Asset.class));
    }

    @Test
    void deletesExistingAsset() {
        when(repository.findById(1L)).thenReturn(Optional.of(sample));
        assertTrue(service.delete(1L));
        verify(repository).deleteById(1L);
    }

    @Test
    void missingAssetCannotDelete() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertFalse(service.delete(99L));
        verify(repository, never()).deleteById(99L);
    }
}
