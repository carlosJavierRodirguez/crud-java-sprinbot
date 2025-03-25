package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Explorer;

public interface IExplorer extends JpaRepository<Explorer, Integer> {

    // @Query("SELECT u FROM user u WHERE u.status != false")
    // List<Explorer> getListExplorerActive();

    @Query("SELECT e FROM explorer e WHERE e.name LIKE %?1%")
    List<Explorer> getListExplorerForName(String filter);
}
