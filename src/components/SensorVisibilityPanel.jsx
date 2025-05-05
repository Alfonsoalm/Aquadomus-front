// SensroVisibilityPanel.jsx
import React, { useState } from "react";

function SensorVisibilityPanel({ sensorData, sensorVisibility, setSensorVisibility }) {
  // Estado local para mostrar/ocultar la lista de checkboxes
  const [showSensors, setShowSensors] = useState(false);

  return (
    <div style={{ margin: "10px 0" }}>
      {/* Botón que alterna la visibilidad de la lista */}
      <button onClick={() => setShowSensors((prev) => !prev)}>
        {showSensors ? "Ocultar Sensores" : "Mostrar Sensores"}
      </button>

      {/* Contenedor plegable con scroll si hay muchos sensores */}
      {showSensors && (
        <div
          style={{
            marginTop: "5px",
            padding: "10px",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          <h3>Selecciona los sensores a visualizar:</h3>
          {sensorData.map((sensor, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={sensorVisibility[sensor.nombre] || false}
                  onChange={(e) =>
                    setSensorVisibility((prev) => ({
                      ...prev,
                      [sensor.nombre]: e.target.checked,
                    }))
                  }
                />
                {sensor.nombre}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SensorVisibilityPanel;
