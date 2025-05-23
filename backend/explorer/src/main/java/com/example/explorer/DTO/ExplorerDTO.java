package com.example.explorer.DTO;

public class ExplorerDTO {

    private int id;
    private String name;
    private String nationality;
    private int age;
    private Integer reputation; // Cambiado de int a Integer
    private String image_explorer;

    public ExplorerDTO(int id, String name, String nationality, int age, Integer reputation, String image_explorer) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
        this.age = age;
        this.reputation = reputation;
        this.image_explorer = image_explorer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Integer getReputation() { // Cambiado de int a Integer
        return reputation;
    }

    public void setReputation(Integer reputation) { // Cambiado de int a Integer
        this.reputation = reputation;
    }

    public String getImageExplorer() {
        return image_explorer;
    }

    public void setImageExplorer(String image_explorer) {
        this.image_explorer = image_explorer;
    }
}
