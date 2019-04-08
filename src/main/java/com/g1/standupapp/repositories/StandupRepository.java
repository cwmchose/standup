package com.g1.standupapp.repositories;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.g1.standupapp.models.Standup;

import org.springframework.data.repository.CrudRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public interface StandupRepository extends CrudRepository<Standup,Long>{
    @Override
    public List<Standup> findAll();

    public Optional<Standup> findById(Long standupID);

    public Optional<Standup> findByDateAndTeam_TeamName(LocalDate Date, String teamName);
}