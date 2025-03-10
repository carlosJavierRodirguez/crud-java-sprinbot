package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "mystica_location")
public class MysticLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_location")
    private int id_location;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "coordinates", length = 100, nullable = false)
    private String coordinates;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    public MysticLocation(int id_location, String name, String coordinates, Mythology mythology) {
        this.id_location = id_location;
        this.name = name;
        this.coordinates = coordinates;
        this.mythology = mythology;
    }

    public void setId(int id_location) {
        this.id_location = id_location;
    }

    public int getId() {
        return id_location;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }
}
