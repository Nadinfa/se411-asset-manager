package com.se411.assetmanager;

import com.se411.assetmanager.controller.AssetController;
import com.se411.assetmanager.model.Asset;
import com.se411.assetmanager.service.AssetService;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AssetControllerTests {
    private AssetService service;
    private AssetController controller;
    private Asset sample;

    @BeforeEach
    void setup() {
        service = mock(AssetService.class);
        controller = new AssetController(service);
        sample = new Asset(1L, "Laptop", "Dell", "X1", "Available", "", "2026-01-01");
    }

    @Test
    void postReturnsCreated() {
        when(service.add(any(Asset.class))).thenReturn(sample);
        var response = controller.add(sample, UriComponentsBuilder.fromPath(""));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("/api/assets/1", response.getHeaders().getLocation().toString());
    }

    @Test
    void postRejectsEmptyName() {
        Asset bad = new Asset(null, "", "Dell", "X1", "Available", "", "2026-01-01");
        assertEquals(HttpStatus.BAD_REQUEST, controller.add(bad, UriComponentsBuilder.fromPath("")).getStatusCode());
        verify(service, never()).add(any());
    }

    @Test
    void getExistingReturnsOk() {
        when(service.getById(1L)).thenReturn(Optional.of(sample));
        assertEquals(HttpStatus.OK, controller.findById(1L).getStatusCode());
    }

    @Test
    void getMissingReturns404() {
        when(service.getById(42L)).thenReturn(Optional.empty());
        assertEquals(HttpStatus.NOT_FOUND, controller.findById(42L).getStatusCode());
    }

    @Test
    void getPageReturnsOk() {
        when(service.getAll(0,5)).thenReturn(new PageImpl<>(List.of(sample)));
        assertEquals(1, controller.findAll(0,5).getBody().getContent().size());
    }

    @Test
    void getPageRejectsInvalidSize() {
        assertEquals(HttpStatus.BAD_REQUEST, controller.findAll(0, 101).getStatusCode());
    }

    @Test
    void putExistingReturnsNoContent() {
        when(service.update(1L, sample)).thenReturn(true);
        assertEquals(HttpStatus.NO_CONTENT, controller.update(1L, sample).getStatusCode());
    }

    @Test
    void putMissingReturns404() {
        when(service.update(9L, sample)).thenReturn(false);
        assertEquals(HttpStatus.NOT_FOUND, controller.update(9L, sample).getStatusCode());
    }

    @Test
    void deleteExistingReturnsNoContent() {
        when(service.delete(1L)).thenReturn(true);
        assertEquals(HttpStatus.NO_CONTENT, controller.delete(1L).getStatusCode());
    }

    @Test
    void deleteMissingReturns404() {
        when(service.delete(9L)).thenReturn(false);
        assertEquals(HttpStatus.NOT_FOUND, controller.delete(9L).getStatusCode());
    }
}
