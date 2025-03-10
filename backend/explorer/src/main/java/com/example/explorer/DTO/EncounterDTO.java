package com.example.explorer.DTO;

public class EncounterDTO {

    private int idEncounter;
    private int explorerId;
    private int godId;
    private int creatureId;

    public EncounterDTO(int idEncounter, int explorerId, int godId, int creatureId) {
        this.idEncounter = idEncounter;
        this.explorerId = explorerId;
        this.godId = godId;
        this.creatureId = creatureId;
    }

    public int getIdEncounter() {
        return idEncounter;
    }

    public void setIdEncounter(int idEncounter) {
        this.idEncounter = idEncounter;
    }

    public int getExplorerId() {
        return explorerId;
    }

    public void setExplorerId(int explorerId) {
        this.explorerId = explorerId;
    }

    public int getGodId() {
        return godId;
    }

    public void setGodId(int godId) {
        this.godId = godId;
    }

    public int getCreatureId() {
        return creatureId;
    }

    public void setCreatureId(int creatureId) {
        this.creatureId = creatureId;
    }
}
