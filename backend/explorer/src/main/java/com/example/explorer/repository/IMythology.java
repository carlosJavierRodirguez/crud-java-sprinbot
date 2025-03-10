package com.example.explorer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Mythology;
public interface IMythology extends JpaRepository<Mythology, Integer> {

}
