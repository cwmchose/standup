package com.g1.standupapp.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name = "Team")
public class Team{

    @Id
    @Column(name = "team_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long teamID;

    @Column(name = "team_name", nullable = false)
    private String teamName;

    @Column(name = "scrum_master_username", nullable = false)
    private String scrumMasterUsername;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "Team_Members",
        joinColumns = { @JoinColumn(name = "team_id") },
        inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private Set<User> users = new HashSet<User>();

    public Team() {
        super();
    }

    public Team(String teamName, String scrumMasterUsername, Set<User> users) {
        this.teamName = teamName;
        this.scrumMasterUsername = scrumMasterUsername;
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

    public String getScrumMasterUsername() {
        return scrumMasterUsername;
    }

    public void setScrumMasterUsername(String scrumMasterUsername) {
        this.scrumMasterUsername = scrumMasterUsername;
    }


}