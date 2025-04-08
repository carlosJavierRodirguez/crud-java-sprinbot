package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/*
 * Agregamos la anotacion bean Entity
 * para indicar que la clase es una entidad
 * name="nombre que registra en la base de datos"
 */

@Entity(name = "mythology")
public class Mythology {

    /*
     * atributos o columnas de entidad
     * 
     * @Id = es una llave primaria
     * 
     * @Column = nombre de la columna en la base de datos
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mythology")
    private int id_mythology;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    // constructor vacio
    public Mythology() {
    }

    // creo el constructor
    public Mythology(int id_mythology, String name, boolean status) {
        this.id_mythology = id_mythology;
        this.name = name;
        this.status = status;
    }

    // Encpasulo el status
    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }

    // Encpasulo el id
    public void setMythologyId(int id_mythology) {
        this.id_mythology = id_mythology;
    }

    public int getMythologyId() {
        return id_mythology;
    }

    // Encpasulo el nombre
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
