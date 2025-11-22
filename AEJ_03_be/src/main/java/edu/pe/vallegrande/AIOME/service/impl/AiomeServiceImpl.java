package edu.pe.vallegrande.AIOME.service.impl;

import edu.pe.vallegrande.AIOME.model.Aiome;
import edu.pe.vallegrande.AIOME.repository.AiomeRepository;
import edu.pe.vallegrande.AIOME.service.AiomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiomeServiceImpl implements AiomeService {

    private final AiomeRepository aiomeRepository;
    private final WebClient webClient;

    @Value("${spring.ai.copilot.api-key}")
    private String copilotApiKey;

    @Value("${spring.ai.copilot.api-host}")
    private String copilotApiHost;

    @Value("${spring.ai.copilot.api-url}")
    private String copilotApiUrl;

    @Value("${spring.ai.gemini.api-key}")
    private String geminiApiKey;

    @Value("${spring.ai.gemini.api-url}")
    private String geminiApiUrl;

    @Override
    public List<Aiome> findAllActive() {
        return aiomeRepository.findByStatus("A");
    }

    @Override
    public List<Aiome> findByAitype(String aitype) {
        return aiomeRepository.findByAitype(aitype);
    }

    @Override
    public List<Aiome> findByStatus(String status) {
        return aiomeRepository.findByStatus(status);
    }

    @Override
    public Aiome findById(Integer id) {
        return aiomeRepository.findById(id).orElse(null);
    }

    @Override
    public Aiome create(String question, String aitype) {
        String response = getAiResponse(question, aitype);
        Aiome aiome = new Aiome();
        aiome.setQuestion(question);
        aiome.setResponse(response);
        aiome.setStatus("A");
        aiome.setDate(LocalDateTime.now());
        aiome.setAitype(aitype.toUpperCase());
        return aiomeRepository.save(aiome);
    }

    @Override
    public Aiome update(Integer id, String question, String response) {
        aiomeRepository.updateQuestionAndResponse(id, question, response);
        return aiomeRepository.findById(id).orElse(null);
    }

    @Override
    public void softDelete(Integer id) {
        aiomeRepository.softDeleteById(id);
    }

    @Override
    public void restore(Integer id) {
        aiomeRepository.restoreById(id);
    }

    @Override
    public void permanentDelete(Integer id) {
        aiomeRepository.deleteById(id);
    }

    @Override
    public String testAiResponse(String question, String aitype) {
        return getAiResponse(question, aitype);
    }

    private String getAiResponse(String question, String aitype) {
        switch (aitype.toUpperCase()) {
            case "COPILOT":
                return getCopilotResponse(question);
            case "GEMINI":
                return getGeminiResponse(question);
            default:
                return "Tipo de AI no soportado";
        }
    }

    private String getCopilotResponse(String question) {
        try {
            Map<String, Object> requestBody = Map.of(
                "messages", new Object[]{
                    Map.of("role", "user", "content", question)
                }
            );
            
            Map response = webClient.post()
                .uri(copilotApiUrl)
                .header("x-rapidapi-key", copilotApiKey)
                .header("x-rapidapi-host", copilotApiHost)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
                
            if (response != null && response.get("choices") != null) {
                List choices = (List) response.get("choices");
                if (!choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    return message.get("content").toString();
                }
            }
            return "No response from Copilot";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String getGeminiResponse(String question) {
        try {
            Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                    Map.of("parts", new Object[]{
                        Map.of("text", question)
                    })
                }
            );
            
            String url = geminiApiUrl + "?key=" + geminiApiKey;
            Map response = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
                
            if (response != null && response.get("candidates") != null) {
                List candidates = (List) response.get("candidates");
                if (!candidates.isEmpty()) {
                    Map candidate = (Map) candidates.get(0);
                    Map content = (Map) candidate.get("content");
                    List parts = (List) content.get("parts");
                    if (!parts.isEmpty()) {
                        Map part = (Map) parts.get(0);
                        return part.get("text").toString();
                    }
                }
            }
            return "No response from Gemini";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}