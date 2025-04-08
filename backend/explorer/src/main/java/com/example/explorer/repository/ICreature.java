package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Creature;

public interface ICreature extends JpaRepository<Creature, Integer> {

    // lista de creaturas
    @Query("SELECT c FROM creature c WHERE c.status != false")
    List<Creature> getListCreatureActive();
    
    //lista de creaturas por nombre
    @Query("SELECT c FROM creature c WHERE LOWER(c.name) LIKE LOWER(CONCAT(?1, '%'))")
    List<Creature> getListCreatureForName(String filter);
}
