package model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "discovery")
public class Discovery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_discovery")
    private int id_discovery;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_explorer", referencedColumnName = "id_mythology")
    private Explorer explorer;

    // llave foranea
    @ManyToOne
    @JoinColumn(name = "id_location", referencedColumnName = "id_mythology")
    private MysticLocation mysticLocation;

    @Column(name = "fecha", nullable = false)
    private LocalDate date;

    public Discovery(int id_discovery, Explorer explorer, MysticLocation mysticLocation, LocalDate date) {
        this.id_discovery = id_discovery;
        this.explorer = explorer;
        this.mysticLocation = mysticLocation;
        this.date = date;
    }

    public void setId(int id_discovery) {
        this.id_discovery = id_discovery;
    }

    public int getId() {
        return id_discovery;
    }

    public void setExplorer(Explorer explorer) {
        this.explorer = explorer;
    }

    public Explorer getExplorer() {
        return explorer;
    }

    public void setMysticLocation(MysticLocation mysticLocation) {
        this.mysticLocation = mysticLocation;
    }

    public MysticLocation getMysticLocation() {
        return mysticLocation;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }
}
