package com.g1.standupapp.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.Standup;

import org.springframework.data.repository.CrudRepository;

public interface StandupRepository extends CrudRepository<Standup,Long>{
    @Override
    public List<Standup> findAll();

    public Optional<Standup> findById(Long standupID);

    public Optional<Standup> findByDateAndTeam_TeamName(LocalDate Date, String teamName);

    public List<Standup> findByTeam_TeamName(String teamName);
}