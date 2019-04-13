package com.g1.standupapp.models;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name ="Standup_Entry", uniqueConstraints = {@UniqueConstraint(columnNames = {"date","team_id","user_id"})})
public class StandupEntry{

    @Id
    @Column(name = "standup_entry_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long standupEntryID;


    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonBackReference(value="teamReference")
    private Team team;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "standup_id")
    @JsonBackReference(value="standupReference")
    private Standup standup;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "today_text")
    private String todayText;

    @Column(name = "tomorrow_text")
    private String tomorrowText;;

    @Column(name = "blocking_text")
    private String blockingText;

    public Long getStandupEntryID() {
        return this.standupEntryID;
    }

    public Standup getStandup() {
        return this.standup;
    }

    public void setStandup(Standup standup) {
        this.standup = standup;
    }

    public Team getTeam() {
        return team;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getTodayText() {
        return this.todayText;
    }

    public void setTodayText(String todayText) {
        this.todayText = todayText;
    }

    public String getTomorrowText() {
        return this.tomorrowText;
    }

    public void setTomorrowText(String tomorrowText) {
        this.tomorrowText = tomorrowText;
    }

    public String getBlockingText() {
        return this.blockingText;
    }

    public void setBlockingText(String blockingText) {
        this.blockingText = blockingText;
    }
    
}