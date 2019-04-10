package com.g1.standupapp.models;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name ="Standup", uniqueConstraints = {@UniqueConstraint(columnNames = {"date","team_id"})})
public class Standup{

    @Id
    @Column(name = "standup_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long standupID;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(
        mappedBy = "standup",
        cascade = CascadeType.ALL
    )
    private Set<StandupEntry> standups;

    public Long getStandupID() {
        return this.standupID;
    }

    public Set<StandupEntry> getStandups() {
        return this.standups;
    }

    public void setStandups(Set<StandupEntry> standups) {
        this.standups = standups;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    
}