package com.g1.standupapp.repositories;

import com.g1.standupapp.models.StandupEntry;

import org.springframework.data.repository.CrudRepository;

public interface StandupEntryRepository extends CrudRepository<StandupEntry,Integer>{

}