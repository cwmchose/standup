package com.g1.standupapp.repositories;

import com.g1.standupapp.models.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {

}