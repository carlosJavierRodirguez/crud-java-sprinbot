package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Legend;

public interface ILegend extends JpaRepository<Legend, Integer> {

    // lista todos los datos con status true de la tabla legend
    @Query("SELECT l FROM legend  l WHERE l.status != false")
    List<Legend> getListLegendActive();

    // listar por titulo
    @Query("SELECT l FROM legend l WHERE LOWER(l.title) LIKE LOWER(CONCAT(?1, '%'))")
    List<Legend> getListLegendForTitle(String title);
}
