package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Artifacts;

public interface IArtifacts extends JpaRepository<Artifacts, Integer> {
    // lista de creaturas
    @Query("SELECT a FROM artifacts  a WHERE a.status != false")
    List<Artifacts> getListArtifactsActive();

    // Lista los artefactos filtrados por nombre
    @Query("SELECT a FROM artifacts a WHERE LOWER(a.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Artifacts> getListArtifactsForName(String filter);
}
