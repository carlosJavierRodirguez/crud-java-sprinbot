package com.example.explorer.DTO;

public class LegendDTO {

    private int idLegend;
    private Integer mythologyId;
    private String story;
    private String title; // Nuevo campo agregado

    public LegendDTO(int idLegend, Integer mythologyId, String story, String title) {
        this.idLegend = idLegend;
        this.mythologyId = mythologyId;
        this.story = story;
        this.title = title; // Inicialización del nuevo campo
    }

    public int getIdLegend() {
        return idLegend;
    }

    public void setIdLegend(int idLegend) {
        this.idLegend = idLegend;
    }

    public Integer getMythologyId() {
        return mythologyId;
    }

    public void setMythologyId(int mythologyId) {
        this.mythologyId = mythologyId;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public String getTitle() { // Getter para title
        return title;
    }

    public void setTitle(String title) { // Setter para title
        this.title = title;
    }
}
