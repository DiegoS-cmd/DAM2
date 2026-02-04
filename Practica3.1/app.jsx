import { useState, useEffect } from "react";

function Tarjeta(props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>Tarjeta Friki</h3>
      <p>
        <strong>Nombre:</strong> {props.nombre || "Sin nombre"}
      </p>
      <p>
        <strong>Rol:</strong> {props.rol}
      </p>
      <p>
        <strong>Subtipo:</strong> {props.subtipo || "Sin subtipo"}
      </p>
      {props.subtipoHumano && (
        <p>
          <strong>Sub-subtipo:</strong> {props.subtipoHumano}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("tierra");
  const [subtipo, setSubtipo] = useState("");
  const [subtipoHumano, setSubtipoHumano] = useState("");

  // Configuración de subtipos por rol
  const subtiposPorRol = {
    criatura: ["Voladoras", "Bestias", "Venenosas", "humanos", "orcos"],
    conjuro: ["dormir", "escudar", "inflamar", "curar"],
    encantamiento: [
      "aura regenerativa",
      "maldición",
      "Resurrección",
      "Ilusión",
    ],
    artefacto: ["anillo", "Arma", "armadura", "Maquinaria"],
    tierra: ["fuego", "agua", "tierra", "aire"],
  };

  // Resetear subtipo cuando cambia el rol
  useEffect(() => {
    setSubtipo("");
    setSubtipoHumano("");
  }, [rol]);

  // Manejar cambio de subtipo
  const handleSubtipoChange = (e) => {
    const nuevoSubtipo = e.target.value;
    setSubtipo(nuevoSubtipo);

    // Si es "humanos", mostrar select de sub-subtipo
    if (nuevoSubtipo === "humanos") {
      // Inicializar sub-subtipo
      setSubtipoHumano("guerrero");
    } else {
      setSubtipoHumano("");
    }
  };

  // Validación de nombre
  const esNombreValido = nombre.trim() !== "";

  return (
    <div
      className="App"
      style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}
    >
      <h1>Tarjeta Friki</h1>

      {/* Input nombre con validación */}
      <div style={{ marginBottom: "15px" }}>
        <label>
          Nombre:
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginLeft: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            placeholder="Escribe tu nombre"
          />
        </label>
        {!esNombreValido && nombre.length > 0 && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            Debes escribir un nombre
          </p>
        )}
      </div>

      {/* Select Rol */}
      <div style={{ marginBottom: "15px" }}>
        <label>
          Rol:
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginLeft: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option value="criatura">criatura</option>
            <option value="conjuro">conjuro</option>
            <option value="tierra">tierra</option>
            <option value="encantamiento">encantamiento</option>
            <option value="artefacto">artefacto</option>
          </select>
        </label>
      </div>

      {/* Select Subtipo condicional */}
      <div style={{ marginBottom: "15px" }}>
        <label>
          Subtipo:
          <select
            value={subtipo}
            onChange={handleSubtipoChange}
            disabled={subtiposPorRol[rol]?.length === 0}
            style={{
              width: "100%",
              padding: "8px",
              marginLeft: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor:
                subtiposPorRol[rol]?.length === 0 ? "#f5f5f5" : "white",
            }}
          >
            <option value="">Selecciona subtipo</option>
            {subtiposPorRol[rol] &&
              subtiposPorRol[rol].map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
          </select>
        </label>
      </div>

      {/* Select Sub-subtipo para humanos */}
      {subtipo === "humanos" && (
        <div style={{ marginBottom: "15px" }}>
          <label>
            Sub-subtipo:
            <select
              value={subtipoHumano}
              onChange={(e) => setSubtipoHumano(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginLeft: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <option value="guerrero">guerrero</option>
              <option value="mago">mago</option>
            </select>
          </label>
        </div>
      )}

      {/* Mostrar Tarjeta solo si hay nombre válido */}
      {esNombreValido && (
        <Tarjeta
          nombre={nombre}
          rol={rol}
          subtipo={subtipo}
          subtipoHumano={subtipoHumano}
        />
      )}
    </div>
  );
}
