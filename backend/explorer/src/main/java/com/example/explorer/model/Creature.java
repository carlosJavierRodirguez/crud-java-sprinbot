package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "creature")
public class Creature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_creature")
    private int id_creature;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "type", length = 100, nullable = false)
    private String type;

    @Column(name = "danger", length = 100, nullable = false)
    private String danger;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    @Column(name= "image_creature",nullable = false)
    private String image_creature;

    public Creature(int id_creature, String name, String type, String danger, Mythology mythology,String image_creature) {
        this.id_creature = id_creature;
        this.name = name;
        this.type = type;
        this.danger = danger;
        this.mythology = mythology;
        this.image_creature= image_creature;
    }

    public void setId(int id_creature) {
        this.id_creature = id_creature;
    }

    public int getId() {
        return id_creature;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setDanger(String danger) {
        this.danger = danger;
    }

    public String getDanger() {
        return danger;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }

    public void setImageCreature(String image_creature) {
        this.image_creature= image_creature;
    }

    public String getImageCreature(){
        return image_creature;
    }
}