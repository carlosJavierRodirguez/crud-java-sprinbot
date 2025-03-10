package com.example.explorer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.God;
public interface IGod extends JpaRepository<God, Integer> {

}
