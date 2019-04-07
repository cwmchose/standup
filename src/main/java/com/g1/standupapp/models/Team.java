package com.g1.standupapp.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Team")
public class Team{

    @Id
    @Column(name = "team_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long teamID;

    @Column(name = "team_name", unique = true, nullable = false)
    private String teamName;

    @Column(name = "scrum_master_email", nullable = false)
    private String scrumMasterEmail;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinTable(
        name = "Team_Members",
        joinColumns = { @JoinColumn(name = "team_id") },
        inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> users = new HashSet<User>();

    public Team() {
        super();
    }

    public Team(String teamName, String scrumMasterEmail, Set<User> users) {
        this.teamName = teamName;
        this.scrumMasterEmail = scrumMasterEmail;
        this.users = users;
    }

    public Long getTeamID() {
        return this.teamID;
    }

    public Set<User> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getTeamName() {
        return this.teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getScrumMasterEmail() {
        return scrumMasterEmail;
    }

    public void setScrumMasterEmail(String scrumMasterEmail) {
        this.scrumMasterEmail = scrumMasterEmail;
    }


}