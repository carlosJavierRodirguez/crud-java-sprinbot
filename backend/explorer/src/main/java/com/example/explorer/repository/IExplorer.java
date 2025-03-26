package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Explorer;

public interface IExplorer extends JpaRepository<Explorer, Integer> {

    @Query("SELECT e FROM explorer e WHERE e.status != false")
    List<Explorer> getListExplorerActive();

    @Query("SELECT e FROM explorer e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Explorer> getListExplorerForName(String filter);

    
}
