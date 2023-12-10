package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HouseRepository extends CrudRepository<House, Long> {

}
