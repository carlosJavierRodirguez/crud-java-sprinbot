package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "encounter")
public class Encounter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_encounter")
    private int id_encounter;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_explorer", referencedColumnName = "id_explorer")
    private Explorer explorer;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_god", referencedColumnName = "id_god")
    private God god;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_creature", referencedColumnName = "id_creature")
    private Creature creature;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    public Encounter() {
    }


    public Encounter(int id_encounter, Explorer explorer, God god, Creature creature, boolean status) {
        this.id_encounter = id_encounter;
        this.explorer = explorer;
        this.god = god;
        this.creature = creature;
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }


    public void setStatus(boolean status) {
        this.status = status;
    }


    public void setId(int id_encounter) {
        this.id_encounter = id_encounter;
    }

    public int getId() {
        return id_encounter;
    }

    public void setExplorer(Explorer explorer) {
        this.explorer = explorer;
    }

    public Explorer getExplorer() {
        return explorer;
    }

    public void setGod(God god) {
        this.god = god;
    }

    public God getGod() {
        return god;
    }

    public void setCreature(Creature creature) {
        this.creature = creature;
    }

    public Creature getCreature() {
        return creature;
    }
}