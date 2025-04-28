package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "artifacts")
public class Artifacts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_artifact")
    private int id_artifact;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    @Column(name = "image_artifact", nullable = false)
    private String image_artifact;

    public Artifacts() {
    }

    public Artifacts(int id_artifact, String name, Mythology mythology, String image_artifact, boolean status) {
        this.id_artifact = id_artifact;
        this.name = name;
        this.mythology = mythology;
        this.image_artifact = image_artifact;
        this.status = status;
    }

    public void setId(int id_artifact) {
        this.id_artifact = id_artifact;
    }

    public int getId() {
        return id_artifact;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setImageArtifact(String image_artifact) {
        this.image_artifact = image_artifact;
    }

    public String getImageArtifact() {
        return image_artifact;
    }
}