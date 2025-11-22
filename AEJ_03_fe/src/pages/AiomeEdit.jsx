import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import aiomeService from "../services/aiomeService";

export default function AiomeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entity, setEntity] = useState(null);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      const res = await aiomeService.getById(id);
      setEntity(res.data);
      setQuestion(res.data?.question || "");
      setResponse(res.data?.response || "");
    } catch (err) {
      console.error(err);
      alert("Error al obtener registro");
    }
  };

  useEffect(() => {
    fetch();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await aiomeService.updateAiome(id, { question, response });
      alert("Actualizado correctamente");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  if (!entity) {
    return (
      <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h2>Editar Pregunta #{id}</h2>
      
      <form onSubmit={handleSave} style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Tipo de IA:
          </label>
          <div style={{ 
            padding: "10px", 
            background: "#f8f9fa",
            borderRadius: "4px",
            border: "1px solid #e9ecef"
          }}>
            {entity.aitype === "COPILOT" ? "🤖 GitHub Copilot" : "💎 Google Gemini"}
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Pregunta:
          </label>
          <textarea
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "4px",
              resize: "vertical",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Respuesta:
          </label>
          <textarea
            rows={8}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "4px",
              resize: "vertical",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            type="button"
            onClick={() => navigate("/")}
            style={{ 
              padding: "10px 20px", 
              border: "1px solid #666", 
              borderRadius: "4px", 
              background: "white", 
              color: "#666", 
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
          
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              padding: "10px 20px", 
              border: "none", 
              borderRadius: "4px", 
              background: loading ? "#ccc" : "#28a745", 
              color: "white", 
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}