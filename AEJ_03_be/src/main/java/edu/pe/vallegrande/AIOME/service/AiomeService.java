package edu.pe.vallegrande.AIOME.service;

import edu.pe.vallegrande.AIOME.model.Aiome;
import java.util.List;

public interface AiomeService {
    List<Aiome> findAllActive();
    List<Aiome> findByAitype(String aitype);
    List<Aiome> findByStatus(String status);
    Aiome findById(Integer id);
    Aiome create(String question, String aitype);
    Aiome update(Integer id, String question, String response);
    void softDelete(Integer id);
    void restore(Integer id);
    void permanentDelete(Integer id);
    String testAiResponse(String question, String aitype);
}