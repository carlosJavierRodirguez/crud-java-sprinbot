package com.example.explorer.DTO;

public class ArtifactsDTO {

    private int idArtifact;
    private String name;
    private Integer mythologyId;
    private String imageArtifact;

    public ArtifactsDTO(int idArtifact, String name, String imageArtifact, Integer mythologyId) {
        this.idArtifact = idArtifact;
        this.name = name;
        this.imageArtifact = imageArtifact;
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

    public Integer getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(Integer mythologyId) {
        this.mythologyId = mythologyId;
    }

    public String getImageArtifact() {
        return imageArtifact;
    }

    public void setImageArtifact(String imageArtifact) {
        this.imageArtifact = imageArtifact;
    }
}
