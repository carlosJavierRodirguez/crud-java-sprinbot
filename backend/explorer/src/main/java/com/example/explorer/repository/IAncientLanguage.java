package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.AncientLanguage;

public interface IAncientLanguage extends JpaRepository<AncientLanguage, Integer> {

    @Query("SELECT a FROM ancient_language a WHERE a.status != false")
    List<AncientLanguage> getListLanguageActive();

    @Query("SELECT a FROM ancient_language a WHERE LOWER(a.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<AncientLanguage> getListLanguageForName(String filter);

}
