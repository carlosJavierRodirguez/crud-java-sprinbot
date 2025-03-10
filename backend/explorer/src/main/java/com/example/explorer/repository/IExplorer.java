package com.example.explorer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.Explorer;
public interface IExplorer extends JpaRepository<Explorer, Integer> {

}
