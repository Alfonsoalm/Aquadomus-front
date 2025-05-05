import React, { useEffect, useMemo } from "react";
import { useSettings } from "../hooks/useSettings";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/Settings.module.css";

export const SettingsPage = () => {
  const {
    dbSize,
    tableSizes,
    deletionMessage,
    fetchDbSize,
    fetchTableSize,
    clearTableData,
  } = useSettings();

  // Memoizamos el array para que no cambie de referencia
  const tables = useMemo(() => ["nodes", "sensors", "sensorData"], []);

  // Carga inicial de tamaños
  useEffect(() => {
    console.log("Cargando tamaños de base de datos y tablas...");
    fetchDbSize();
    tables.forEach(fetchTableSize);
  }, [fetchTableSize, fetchDbSize, tables]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ajustes de Base de Datos</h2>

      <div className={styles.section}>
        <span className={styles.label}>Tamaño total:</span>
        <span className={styles.dbSize}>{dbSize} MB</span>
      </div>

      {tables.map((table) => (
        <div key={table} className={styles.tableCard}>
          <div className={styles.contentRow}>
            <h3 className={styles.tableTitle}>
              {`${table}:  `}{tableSizes[table] ? tableSizes[table] : 0} MB
            </h3>
            <button
              className={styles.deleteButton} // Cambiamos el estilo para el ícono
              onClick={() => clearTableData(table)}
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </div>
      ))}

      {deletionMessage && (
        <div className={styles.deletionMessage}>
          {deletionMessage}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
