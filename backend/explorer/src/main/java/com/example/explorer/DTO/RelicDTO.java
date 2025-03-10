package com.example.explorer.DTO;

public class RelicDTO {

    private int id_relic;
    private int id_artifact;
    private int id_location;
    private String history;

    public RelicDTO(int id_relic, int id_artifact, int id_location, String history) {
        this.id_relic = id_relic;
        this.id_artifact = id_artifact;
        this.id_location = id_location;
        this.history = history;
    }

    public void setId_relic(int id_relic) {
        this.id_relic = id_relic;
    }

    public int getId_relic() {
        return id_relic;
    }

    public void setId_artifact(int id_artifact) {
        this.id_artifact = id_artifact;
    }

    public int getId_artifact() {
        return id_artifact;
    }

    public void setId_location(int id_location) {
        this.id_location = id_location;
    }

    public int getId_location() {
        return id_location;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getHistory() {
        return history;
    }
}

