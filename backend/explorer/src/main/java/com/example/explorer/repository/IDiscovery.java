package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Discovery;

public interface IDiscovery extends JpaRepository<Discovery, Integer> {
   
    @Query("SELECT d FROM discovery d WHERE d.status != false")
    List<Discovery> getListDiscoveryActive();

    @Query("SELECT d FROM discovery d JOIN d.explorer e WHERE LOWER(e.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Discovery> getListDiscoveryForExplorerName(String filter);

}
