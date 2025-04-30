package com.example.explorer.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Meeting")
    private int id_Meeting;

    @ManyToOne
    @JoinColumn(name = "id_explorer", nullable = false, referencedColumnName = "id_explorer")
    private Explorer explorer;

    @ManyToOne
    @JoinColumn(name = "id_creature", nullable = false, referencedColumnName = "id_creature")
    private Creature creature;

    @Column(name = "date_meeting", nullable = false)
    private LocalDate date_meeting;

    public Meeting() {
    }

    public Meeting(int id_Meeting, Explorer explorer, Creature creature, LocalDate date_meeting) {
        this.id_Meeting = id_Meeting;
        this.explorer = explorer;
        this.creature = creature;
        this.date_meeting = date_meeting;
    }

    public int getId_Meeting() {
        return id_Meeting;
    }

    public void setId_Meeting(int id_Meeting) {
        this.id_Meeting = id_Meeting;
    }

    public Explorer getExplorer() {
        return explorer;
    }

    public void setExplorer(Explorer explorer) {
        this.explorer = explorer;
    }

    public Creature getCreature() {
        return creature;
    }

    public void setCreature(Creature creature) {
        this.creature = creature;
    }

    public LocalDate getDate_meeting() {
        return date_meeting;
    }

    public void setDate_meeting(LocalDate date_meeting) {
        this.date_meeting = date_meeting;
    }

}
