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

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @Column(name = "nationality", length = 45, nullable = false)
    private String nationality;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "reputation", nullable = false)
    private Integer reputation;

    @Column(name = "image_explorer", nullable = false)
    private String image_explorer;

    public Explorer() {
    }

    // Constructor con parámetros
    public Explorer(int id_explorer, String name, String nationality, int age, Integer reputation,
            String image_explorer) {
        this.id_explorer = id_explorer;
        this.name = name;
        this.nationality = nationality;
        this.age = age;
        this.reputation = reputation;
        this.image_explorer = image_explorer;
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

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Integer getReputation() {
        return reputation;
    }

    public void setReputation(Integer reputation) {
        this.reputation = reputation;
    }

    public String getImageExplorer() {
        return image_explorer;
    }

    public void setImageExplorer(String image_explorer) {
        this.image_explorer = image_explorer;
    }
}
