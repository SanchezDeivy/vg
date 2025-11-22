package edu.pe.vallegrande.AIOME.repository;

import edu.pe.vallegrande.AIOME.model.Aiome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface AiomeRepository extends JpaRepository<Aiome, Integer> {

    List<Aiome> findByAitypeAndStatus(String aitype, String status);
    List<Aiome> findByStatus(String status);
    List<Aiome> findByAitype(String aitype);

    @Transactional
    @Modifying
    @Query("UPDATE Aiome a SET a.status = 'A' WHERE a.id = :id")
    void restoreById(Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE Aiome a SET a.status = 'I' WHERE a.id = :id")
    void softDeleteById(Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE Aiome a SET a.question = :question, a.response = :response WHERE a.id = :id")
    void updateQuestionAndResponse(Integer id, String question, String response);
}