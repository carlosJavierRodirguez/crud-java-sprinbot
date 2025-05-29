package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "ancient_language")
public class AncientLanguage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_language") // Definir el nombre de la columna
    private int id_language;

    @Column(name = "name", length = 100, nullable = false) // Nombre de la lengua
    private String name;

    @Column(name = "origin_region", length = 100) // Región de origen
    private String originRegion;

    @Column(name = "writing_system", length = 100) // Sistema de escritura
    private String writingSystem;

    @ManyToOne
    @JoinColumn(name = "id_explorer", referencedColumnName = "id_explorer") // Relación de clave foránea
    private Explorer explorer;

    @Column(name = "status", nullable = false, columnDefinition = "boolean default true") // Estado de la lengua
    private boolean status;

    public AncientLanguage() {
    }

    public AncientLanguage(String name, String originRegion, String writingSystem, Explorer explorer) {
        this.name = name;
        this.originRegion = originRegion;
        this.writingSystem = writingSystem;
        this.explorer = explorer;
    }

    // Getters y Setters
    public int getId_ancient_language() {
        return id_language;
    }

    public void setId_ancient_language(int id_ancient_language) {
        this.id_language = id_ancient_language;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOriginRegion() {
        return originRegion;
    }

    public void setOriginRegion(String originRegion) {
        this.originRegion = originRegion;
    }

    public String getWritingSystem() {
        return writingSystem;
    }

    public void setWritingSystem(String writingSystem) {
        this.writingSystem = writingSystem;
    }

    public Explorer getExplorer() {
        return explorer;
    }

    public void setExplorer(Explorer explorer) {
        this.explorer = explorer;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
