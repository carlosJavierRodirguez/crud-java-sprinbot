package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "explorer")
public class explorer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_explorer")
    private int id_explorer;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "reputation", nullable = false)
    private Integer reputation;

    // creo el constructor
    public explorer(int id_explorer, String name, Integer reputation) {
        this.id_explorer = id_explorer;
        this.name = name;
        this.reputation = reputation;
    }

    // Encapsulo el id
    public void setId(int id_explorer) {
        this.id_explorer = id_explorer;
    }

    public int getId() {
        return id_explorer;
    }

    // Encpasulo el nombre
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    // Encpasulo la reputacion
    public void setReputation(int reputation) {
        this.reputation = reputation;
    }

    public int getReputation() {
        return reputation;
    }

}
