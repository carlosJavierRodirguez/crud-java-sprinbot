package com.example.explorer.DTO;

public class MythologyDTO {

    private int idMythology;
    private String name;

    public MythologyDTO(int idMythology, String name) {
        this.idMythology = idMythology;
        this.name = name;
    }

    public int getIdMythology() {
        return idMythology;
    }

    public void setIdMythology(int idMythology) {
        this.idMythology = idMythology;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
