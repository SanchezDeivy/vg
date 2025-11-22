import { useEffect, useState } from "react";
import { getAll, softDelete } from "../services/aiomeService";

function AiomeList({ refresh }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getAll();
      setItems(
        Array.isArray(response.data) ? response.data : response.data.data || []
      );
    } catch (err) {
      console.error("Error al cargar:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      try {
        await softDelete(id);
        loadData();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Historial de Conversaciones
      </h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Cargando...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
          No hay conversaciones guardadas
        </div>
      ) : (
        <div>
          {items.map((aiome) => (
            <div
              key={aiome.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {aiome.aitype === "COPILOT" ? "🤖 Copilot" : "💎 Gemini"} -{" "}
                  {aiome.date ? new Date(aiome.date).toLocaleString() : ""}
                </div>
                <button
                  onClick={() => handleDelete(aiome.id)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Eliminar
                </button>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <strong>Pregunta:</strong>
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "5px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {aiome.question}
                </div>
              </div>

              <div>
                <strong>Respuesta:</strong>
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "4px",
                    marginTop: "5px",
                    border: "1px solid #e9ecef",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {aiome.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AiomeList;
