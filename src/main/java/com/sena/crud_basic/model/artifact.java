package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "artifact")
public class artifact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artifact")
    private int id_artifact;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "power", length = 1000, nullable = false)
    private String power;

}
