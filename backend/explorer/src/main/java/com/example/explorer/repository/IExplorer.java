package com.example.explorer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.explorer.model.Explorer;

public interface IExplorer extends JpaRepository<Explorer, Integer> {
    // lista de exploradores activos
    @Query("SELECT e FROM explorer e WHERE e.status != false")
    List<Explorer> getListExplorerActive();

    // filtrar exploradores por nombre
    @Query("SELECT e FROM explorer e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Explorer> getListExplorerForName(String filter);

    // filtrar exploradores por edad
    @Query("SELECT e FROM explorer e WHERE CAST(e.age AS string) LIKE CONCAT('%', ?1, '%')")
    List<Explorer> getListExplorerForAge(int filter);

    // filtrar exploradores por nacionalidad
    @Query("SELECT e FROM explorer e WHERE LOWER(e.nationality) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Explorer> getListExplorerForNationality(String filter);

    // filtrar exploradores por reputación
    @Query("SELECT e FROM explorer e WHERE CAST(e.reputation AS string) LIKE CONCAT('%', ?1, '%')")
    List<Explorer> getListExplorerForReputation(int filter);

    //Listar mejores 4 exploradores
    @Query("SELECT e FROM explorer e ORDER BY reputation DESC LIMIT 4")
    List<Explorer> getTopExplorer();

}
