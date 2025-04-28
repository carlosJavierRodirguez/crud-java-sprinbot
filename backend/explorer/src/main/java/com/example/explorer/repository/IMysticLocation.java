package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.MysticLocation;

public interface IMysticLocation extends JpaRepository<MysticLocation, Integer> {
    // lista de localizaciones activos
    @Query("SELECT m FROM mystica_location m WHERE m.status != false")
    List<MysticLocation> getListMysticLocationActive();

    // filtrar localizaciones por nombre
    @Query("SELECT m FROM mystica_location m WHERE LOWER(m.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<MysticLocation> getListMysticLocationForName(String filter);
}
