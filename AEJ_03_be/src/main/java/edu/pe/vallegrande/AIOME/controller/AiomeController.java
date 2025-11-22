package edu.pe.vallegrande.AIOME.controller;

import edu.pe.vallegrande.AIOME.model.Aiome;
import edu.pe.vallegrande.AIOME.service.AiomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/aiome")
@RequiredArgsConstructor
@Tag(name = "AIOME Controller", description = "Controlador para gestionar preguntas y respuestas de AI")
public class AiomeController {

    private final AiomeService aiomeService;

    @GetMapping
    @Operation(summary = "Obtener todos los registros activos")
    public List<Aiome> getAllActive() {
        return aiomeService.findAllActive();
    }

    @GetMapping("/aitype/{aitype}")
    @Operation(summary = "Listar por tipo de AI")
    public List<Aiome> getByAitype(@PathVariable String aitype) {
        return aiomeService.findByAitype(aitype.toUpperCase());
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Listar por estado")
    public List<Aiome> getByStatus(@PathVariable String status) {
        return aiomeService.findByStatus(status);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener por ID")
    public ResponseEntity<Aiome> getById(@PathVariable Integer id) {
        Aiome aiome = aiomeService.findById(id);
        if (aiome != null) {
            return ResponseEntity.ok(aiome);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Crear nueva pregunta")
    public ResponseEntity<Aiome> create(@RequestParam String question,
                                        @RequestParam String aitype) {
        Aiome aiome = aiomeService.create(question, aitype);
        return ResponseEntity.ok(aiome);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar pregunta y respuesta")
    public ResponseEntity<Aiome> update(@PathVariable Integer id,
                                        @RequestParam String question,
                                        @RequestParam String response) {
        Aiome aiome = aiomeService.update(id, question, response);
        return ResponseEntity.ok(aiome);
    }

    @DeleteMapping("/soft/{id}")
    @Operation(summary = "Eliminado lógico (status = 'I')")
    public ResponseEntity<Void> softDelete(@PathVariable Integer id) {
        aiomeService.softDelete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/restore/{id}")
    @Operation(summary = "Restaurar registro (status = 'A')")
    public ResponseEntity<Void> restore(@PathVariable Integer id) {
        aiomeService.restore(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminado físico")
    public ResponseEntity<Void> permanentDelete(@PathVariable Integer id) {
        aiomeService.permanentDelete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/test-ai")
    @Operation(summary = "Probar AI sin guardar en BD")
    public ResponseEntity<String> testAi(@RequestParam String question,
                                         @RequestParam String aitype) {
        String response = aiomeService.testAiResponse(question, aitype);
        return ResponseEntity.ok(response);
    }
}