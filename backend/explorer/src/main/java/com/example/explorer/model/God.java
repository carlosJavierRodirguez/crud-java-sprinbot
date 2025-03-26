package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "god")
public class God {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_god")
    private int id_god;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "domain", length = 100, nullable = false)
    private String domain;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_mythology", referencedColumnName = "id_mythology")
    private Mythology mythology;

    @Column(name = "image_god", nullable = false)
    private String image_god;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true ")
    private boolean status;

    public God() {
    }

    public God(int id_god, String name, String domain, Mythology mythology, String image_god, boolean status) {
        this.id_god = id_god;
        this.name = name;
        this.domain = domain;
        this.mythology = mythology;
        this.image_god = image_god;
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setId(int id_god) {
        this.id_god = id_god;
    }

    public int getId() {
        return id_god;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getDomain() {
        return domain;
    }

    public void setMythology(Mythology mythology) {
        this.mythology = mythology;
    }

    public Mythology getMythology() {
        return mythology;
    }

    public void setImageGod(String image_god) {
        this.image_god = image_god;
    }

    public String getImageGod() {
        return image_god;
    }
}
