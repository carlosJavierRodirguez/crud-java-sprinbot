package com.example.explorer.DTO;

public class MythologyDTO {

    private int idMythology;
    private String name;
    private String region;
    private String era;

    public MythologyDTO(int idMythology, String name, String region, String era) {
        this.idMythology = idMythology;
        this.name = name;
        this.region = region;
        this.era = era;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getEra() {
        return era;
    }

    public void setEra(String era) {
        this.era = era;
    }
}
