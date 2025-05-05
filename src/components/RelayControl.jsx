// RelayControl.jsx
import React from "react";
import { Switch } from "@mui/material";

const RelayControl = ({ status, changeState }) => {
  return (
    <div style={{ 
        marginBottom: "20px",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center" 
        }}>
      <h2>Control de Relé</h2>
      <p>Estado actual: <strong>{status ? "Encendido" : "Apagado"}</strong></p>
      <Switch checked={status} onChange={changeState} />
    </div>
  );
};

export default RelayControl;