import React, { useEffect, useState } from "react";
import { formatDateTime } from "../utils/formatUtils";
import { usePagination } from "../hooks/usePagination"; // Importamos el hook personalizado
import styles from "../styles/Table.module.css";
import buttonStyles from "../styles/Buttons.module.css";
import Pagination from "./Pagination"; // Importamos el componente de Paginación
import SearchBar from "./SearchBar"; // Importamos el componente de búsqueda

const SensorTable = ({ changeSensor, sensors }) => {
  const columnOrder = ["id_sensor", "nombre", "valor", "unidades", "estado", "fecha_hora"];
  const [filteredSensors, setFilteredSensors] = useState(sensors); // Estado para las entidades filtradas
  
  // Usamos el hook de paginación, pero ahora trabajamos con `filteredSensors`
  const { currentPage, totalPages, nextPage, prevPage } = usePagination(filteredSensors);

  // Obtener los sensores para la página actual
  const sensorsPerPage = 5;
  const startIndex = (currentPage - 1) * sensorsPerPage;
  const paginatedItems = filteredSensors.slice(startIndex, startIndex + sensorsPerPage);

  // Manejar la búsqueda y filtrar los sensores
  const handleSearch = (searchTerm) => {
    const filtered = sensors.filter((sensor) => {
      return Object.values(sensor).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSensors(filtered);
    if (filtered.length === 0) return;
    if (currentPage !== 1) nextPage(1);
  };

  // Usamos useEffect para inicializar el estado de `filteredSensors` con los datos completos de `sensors` al cargar la página.
  useEffect(() => {
    setFilteredSensors(sensors);
  }, [sensors]);

  return (
    <div className={styles.tableContainer}>
      {(!sensors || sensors.length === 0) ? (
        <h3 className={styles.emptyData}>
          No hay datos de sensores disponibles.
        </h3>
      ) : (
        <>
          <h1>Sensores</h1>
          {/* Barra de búsqueda */}
          <SearchBar onSearch={handleSearch} />

          <table className={styles.table}>
            <thead>
              <tr>
                {columnOrder.map((key) => (
                  <th key={key}>{key.replace(/_/g, " ").toUpperCase()}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((sensor, index) => (
                <tr key={index}>
                  {columnOrder.map((key) => (
                    <td key={key}>
                      {sensor[key] !== undefined && sensor[key] !== null
                        ? key === "fecha_hora"
                          ? formatDateTime(sensor[key])
                          : sensor[key]
                        : "No disponible"}
                    </td>
                  ))}
                  <td>
                    <button
                      className={buttonStyles.button}
                      onClick={() => changeSensor(sensor.id_sensor)}
                    >
                      Ver Historial
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Aquí utilizamos el componente de Paginación */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </>
      )}
    </div>
  );
};

export default SensorTable;
