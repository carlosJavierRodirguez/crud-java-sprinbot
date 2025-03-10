package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Creature;

public interface ICreature extends JpaRepository<Creature, Integer> {

}
