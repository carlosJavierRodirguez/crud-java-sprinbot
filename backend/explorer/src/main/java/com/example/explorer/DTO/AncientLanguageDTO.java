package com.example.explorer.DTO;

public class AncientLanguageDTO {
    private int idLanguage;
    private String name;
    private String originRegion;
    private String writingSystem;
    private Integer explorerId;

    public AncientLanguageDTO() {
    }

    public AncientLanguageDTO(int idLanguage, String name, String originRegion, String writingSystem,
            Integer explorerId) {
        this.idLanguage = idLanguage;
        this.name = name;
        this.originRegion = originRegion;
        this.writingSystem = writingSystem;
        this.explorerId = explorerId;
    }

    public int getIdLanguage() {
        return idLanguage;
    }

    public void setIdLanguage(int idLanguage) {
        this.idLanguage = idLanguage;
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

    public Integer getExplorerId() {
        return explorerId;
    }

    public void setExplorerId(Integer explorerId) {
        this.explorerId = explorerId;
    }
}
