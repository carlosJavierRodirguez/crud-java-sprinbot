package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Encounter;

public interface IEncounter extends JpaRepository<Encounter, Integer> {

}
