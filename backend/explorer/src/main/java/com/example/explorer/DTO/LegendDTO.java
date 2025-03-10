package com.example.explorer.DTO;

public class LegendDTO {

    private int idLegend;
    private int mythologyId;
    private String story;

    public LegendDTO(int idLegend, int mythologyId, String story) {
        this.idLegend = idLegend;
        this.mythologyId = mythologyId;
        this.story = story;
    }

    public int getIdLegend() {
        return idLegend;
    }

    public void setIdLegend(int idLegend) {
        this.idLegend = idLegend;
    }

    public int getMythologyId() {
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
}
