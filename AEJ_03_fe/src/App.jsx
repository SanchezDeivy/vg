import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AiomeList from "./pages/AiomeList.jsx";
import AiomeForm from "./pages/AiomeForm.jsx";
import AiomeEdit from "./pages/AiomeEdit.jsx";

function NavBar() {
  const location = useLocation();
  
  return (
    <nav style={{ background: "#007bff", padding: "15px 0" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "24px", fontWeight: "bold" }}>
          AIOME Chat
        </Link>
        
        <div style={{ display: "flex", gap: "20px" }}>
          <Link 
            to="/" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "8px 16px",
              borderRadius: "4px",
              background: location.pathname === "/" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
          >
            Historial
          </Link>
          <Link 
            to="/new" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "8px 16px",
              borderRadius: "4px",
              background: location.pathname === "/new" ? "rgba(255,255,255,0.2)" : "transparent"
            }}
          >
            Nuevo Chat
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = (newItem) => {
    console.log("Nueva pregunta creada:", newItem);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<AiomeList refresh={refreshKey} />} />
          <Route path="/new" element={<AiomeForm onCreated={handleCreated} />} />
          <Route path="/edit/:id" element={<AiomeEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}