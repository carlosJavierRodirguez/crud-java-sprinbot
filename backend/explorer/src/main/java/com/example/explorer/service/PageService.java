package com.example.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.PageDTO;
import com.example.explorer.repository.IPage;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Page;

import java.util.List;
import java.util.Optional;

@Service
public class PageService {
    @Autowired
    private IPage data;

    public List<Page> findAll() {
        return data.findAll();
    }

    public Optional<Page> findById(int id) {
        return data.findById(id);
    }

    public responseDTO deletePage(int id) {
        Optional<Page> pageOpt = findById(id);
        if (!pageOpt.isPresent()) {
            return new responseDTO("La página no existe", "404");
        }
        data.deleteById(id);
        return new responseDTO("Página eliminada correctamente", "200");
    }

    public responseDTO save(PageDTO pageDTO) {
        Page page = convertToModel(pageDTO);
        data.save(page);
        return new responseDTO("Página guardada correctamente", "200");
    }

    public responseDTO updatePage(int id, PageDTO pageDTO) {
        Optional<Page> pageOpt = findById(id);
        if (!pageOpt.isPresent()) {
            return new responseDTO("La página no existe", "404");
        }
        Page updatedPage = pageOpt.get();
        updatedPage.setName(pageDTO.getName());
        updatedPage.setPath(pageDTO.getPath());
        updatedPage.setDescription(pageDTO.getDescription());

        data.save(updatedPage);
        return new responseDTO("Página actualizada correctamente", "200");
    }

    public PageDTO convertToDTO(Page page) {
        return new PageDTO(
                page.getId(),
                page.getName(),
                page.getPath(),
                page.getDescription());
    }

    public Page convertToModel(PageDTO pageDTO) {
        return new Page(
                pageDTO.getId(),
                pageDTO.getName(),
                pageDTO.getPath(),
                pageDTO.getDescription());
    }
}
