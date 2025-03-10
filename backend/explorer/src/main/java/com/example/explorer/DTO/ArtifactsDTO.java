package com.example.explorer.DTO;

public class ArtifactsDTO {

    private int idArtifact;
    private String name;
    private String power;
    private int mythologyId;

    public ArtifactsDTO(int idArtifact, String name, String power, int mythologyId) {
        this.idArtifact = idArtifact;
        this.name = name;
        this.power = power;
        this.mythologyId = mythologyId;
    }

    public int getIdArtifact() {
        return idArtifact;
    }

    public void setIdArtifact(int idArtifact) {
        this.idArtifact = idArtifact;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public int getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(int mythologyId) {
        this.mythologyId = mythologyId;
    }
}
