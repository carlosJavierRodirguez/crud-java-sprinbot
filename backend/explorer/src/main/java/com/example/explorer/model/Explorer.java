package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "explorer")
public class Explorer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_explorer")
    private int id_explorer;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "reputation", nullable = false)
    private Integer reputation;

    // Constructor con parámetros
    public Explorer(int id_explorer, String name, Integer reputation) {
        this.id_explorer = id_explorer;
        this.name = name;
        this.reputation = reputation;
    }

    // Getters y Setters

    public int getId_explorer() {
        return id_explorer;
    }

    public void setId_explorer(int id_explorer) {
        this.id_explorer = id_explorer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getReputation() {
        return reputation;
    }

    public void setReputation(Integer reputation) {
        this.reputation = reputation;
    }
}
