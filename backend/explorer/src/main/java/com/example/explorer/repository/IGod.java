package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.God;

public interface IGod extends JpaRepository<God, Integer> {

    // lista de dioses activos
    @Query("SELECT g FROM god g WHERE g.status != false")
    List<God> getListGodActive();

    // filtrar dioses por nombre
    @Query("SELECT g FROM god g WHERE LOWER(g.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<God> getListGodForName(String filter);
}
