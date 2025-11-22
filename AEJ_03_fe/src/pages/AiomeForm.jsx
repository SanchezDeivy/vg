import { useState } from "react";
import { createAiome } from "../services/aiomeService";

function AiomeForm({ onCreated }) {
  const [question, setQuestion] = useState("");
  const [aitype, setAitype] = useState("COPILOT");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Agregar pregunta del usuario a la conversación
    const userMessage = {
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString()
    };
    setConversation(prev => [...prev, userMessage]);
    
    setLoading(true);
    try {
      const res = await createAiome({ question, aitype });
      
      // Agregar respuesta de la IA a la conversación
      const aiMessage = {
        type: "ai",
        text: res.data.response,
        aitype: aitype,
        time: new Date().toLocaleTimeString()
      };
      setConversation(prev => [...prev, aiMessage]);
      
      onCreated(res.data);
      setQuestion("");
    } catch (err) {
      console.error("Error al crear:", err);
      const errorMessage = {
        type: "error",
        text: "Error al obtener respuesta",
        time: new Date().toLocaleTimeString()
      };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Chat con IA</h2>
      
      {/* Área de conversación */}
      <div style={{ 
        height: "400px", 
        border: "1px solid #ddd", 
        borderRadius: "8px", 
        padding: "15px", 
        marginBottom: "20px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9"
      }}>
        {conversation.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", marginTop: "150px" }}>
            Escribe una pregunta para comenzar...
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              {msg.type === "user" && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ 
                    display: "inline-block", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    padding: "10px 15px", 
                    borderRadius: "15px", 
                    maxWidth: "70%",
                    textAlign: "left"
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                    Tú - {msg.time}
                  </div>
                </div>
              )}
              
              {msg.type === "ai" && (
                <div style={{ textAlign: "left" }}>
                  <div style={{ 
                    display: "inline-block", 
                    backgroundColor: "white", 
                    border: "1px solid #ddd",
                    padding: "10px 15px", 
                    borderRadius: "15px", 
                    maxWidth: "70%"
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                    {msg.aitype === "COPILOT" ? "🤖 Copilot" : "💎 Gemini"} - {msg.time}
                  </div>
                </div>
              )}
              
              {msg.type === "error" && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    display: "inline-block", 
                    backgroundColor: "#dc3545", 
                    color: "white", 
                    padding: "10px 15px", 
                    borderRadius: "15px"
                  }}>
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {loading && (
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <div style={{ 
              display: "inline-block", 
              backgroundColor: "#f0f0f0", 
              padding: "10px 15px", 
              borderRadius: "15px"
            }}>
              {aitype === "COPILOT" ? "🤖" : "💎"} Escribiendo...
            </div>
          </div>
        )}
      </div>
      
      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "end" }}>
        <div style={{ flex: 1 }}>
          <select 
            value={aitype} 
            onChange={(e) => setAitype(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px", 
              border: "1px solid #ddd", 
              borderRadius: "4px",
              marginBottom: "10px"
            }}
          >
            <option value="COPILOT">🤖 Copilot</option>
            <option value="GEMINI">💎 Gemini</option>
          </select>
          
          <textarea
            placeholder="Escribe tu pregunta..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
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
        
        <button 
          type="submit"
          disabled={loading || !question.trim()}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: loading ? "#ccc" : "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            height: "fit-content"
          }}
        >
          {loading ? "..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default AiomeForm;
