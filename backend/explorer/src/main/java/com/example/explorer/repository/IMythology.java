package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Mythology;

public interface IMythology extends JpaRepository<Mythology, Integer> {

    // listar mitologias
    @Query("SELECT m FROM mythology m WHERE m.status != false")
    List<Mythology> getListMythologyActive();

    @Query("SELECT m FROM mythology m WHERE LOWER(m.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Mythology> getListMythologyForName(String filter);
}
