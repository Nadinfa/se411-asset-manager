package com.se411.assetmanager.repository;

import com.se411.assetmanager.model.Asset;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AssetRepository extends CrudRepository<Asset, Long>,
        PagingAndSortingRepository<Asset, Long> {
}
