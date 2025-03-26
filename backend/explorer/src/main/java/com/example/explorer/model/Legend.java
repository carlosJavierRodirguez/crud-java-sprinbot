package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity(name = "legend")
public class Legend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_legend")
    private int id_legend;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    @Lob
    @Column(name = "story", nullable = false, columnDefinition = "TEXT")
    private String story;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    public Legend() {
    }

    public Legend(int id_legend, Mythology mythology, String story, boolean status) {
        this.id_legend = id_legend;
        this.mythology = mythology;
        this.story = story;
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setId(int id_legend) {
        this.id_legend = id_legend;
    }

    public int getId() {
        return id_legend;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getStory() {
        return story;
    }
}
