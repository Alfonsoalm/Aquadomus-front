import React from "react";
import styles from "../styles/NodeSelector.module.css";

export const NodeSelector = ({ changeNode, selectedIPId, ipData }) => {
  // Cuando el usuario selecciona un nodo, actualiza selectedIPId y la URL

  return (
    <div className={styles.nodeSelectorContainer}>
      <h2 className={styles.nodeSelectorTitle}>Seleccionar Nodo</h2>
      <select
        onChange={(e) => {
          const selectedId = e.target.value;
          changeNode(selectedId); // Cambia el nodo con el ID seleccionado
        }}
        value={selectedIPId || ""}
        className={styles.nodeSelectorDropdown}
      >
        <option value="" disabled>
          --- Seleccionar Nodo ---
        </option>
        {ipData && typeof ipData === "object"
          ? Object.entries(ipData).map(([id, { ip, name }]) => (
              <option key={id} value={id}>
                {name} ({ip})  {/* Muestra el nombre y la IP */}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default NodeSelector;