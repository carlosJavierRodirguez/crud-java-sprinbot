package com.example.explorer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Relic;
public interface IRelic extends JpaRepository<Relic, Integer> {

}
