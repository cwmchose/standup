package com.g1.standupapp.repositories;

import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {
    @Override
    public List<Team> findAll();

    public Optional<Team> findById(Integer teamId);

    public Optional<Team> findByTeamName(String teamName);
}