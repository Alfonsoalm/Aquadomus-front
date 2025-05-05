import React, { useEffect, useState } from "react";
import { formatDateTime } from "../utils/formatUtils";
import { usePagination } from "../hooks/usePagination";
import styles from "../styles/Table.module.css";
import buttonStyles from "../styles/Buttons.module.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const ActuatorTable = ({
  changeActuator,
  actuators,
  setOnState,
  setOffState,
}) => {
  const columnOrder = ["id_sensor", "nombre", "valor", "fecha_hora"];
  const [filteredActuators, setFilteredActuators] = useState([]);
  const [actuatorStates, setActuatorStates] = useState({});

  const { currentPage, totalPages, nextPage, prevPage } =
    usePagination(filteredActuators);

  const actuatorsPerPage = 5;
  const startIndex = (currentPage - 1) * actuatorsPerPage;
  const paginatedItems = filteredActuators.slice(
    startIndex,
    startIndex + actuatorsPerPage
  );

  useEffect(() => {
    setFilteredActuators(actuators || []);

    // Solo se actualiza si hay actuadores y el estado está vacío (evitar bucle)
    if (actuators && actuators.length > 0 && Object.keys(actuatorStates).length === 0) {
      const initialStates = {};
      actuators.forEach((a) => {
        initialStates[a.id_sensor] = a.valor === "on";
      });
      setActuatorStates(initialStates);
    }
  }, [actuators, actuatorStates]);

  const handleSearch = (searchTerm) => {
    const filtered = actuators.filter((actuator) =>
      Object.values(actuator).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredActuators(filtered);
    if (filtered.length === 0) return;
    if (currentPage !== 1) nextPage(1);
  };

  const toggleActuator = async (id, newState) => {
    // Estado optimista
    setActuatorStates((prev) => ({
      ...prev,
      [id]: newState,
    }));

    try {
      if (newState) {
        await setOnState(id);
      } else {
        await setOffState(id);
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      // Revertir cambio si falla
      setActuatorStates((prev) => ({
        ...prev,
        [id]: !newState,
      }));
    }
  };

  return (
    <div className={styles.tableContainer}>
      {!filteredActuators || filteredActuators.length === 0 ? (
        <h3 className={styles.emptyData}>No hay datos de actuadores disponibles.</h3>
      ) : (
        <>
          <h1>Actuadores</h1>
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
              {paginatedItems.map((actuator, index) => {
                const isOn = actuatorStates[actuator.id_sensor];
                return (
                  <tr key={index}>
                    {columnOrder.map((key) => (
                      <td
                        key={key}
                        className={
                          key === "valor"
                            ? isOn
                              ? styles.greenBackground
                              : styles.redBackground
                            : ""
                        }
                      >
                        {key === "valor" ? (
                        <label className={buttonStyles.switch}>
                          <input
                            type="checkbox"
                            checked={!!isOn}
                            onChange={(e) =>
                              toggleActuator(actuator.id_sensor, e.target.checked)
                            }
                          />
                          <span className={buttonStyles.slider}></span>
                        </label>
                        ) : key === "fecha_hora" ? (
                          formatDateTime(actuator[key])
                        ) : (
                          actuator[key] ?? "No disponible"
                        )}
                      </td>
                    ))}
                      <div className={buttonStyles.actionRow}>
                        <button
                          className={buttonStyles.button}
                          onClick={() => changeActuator(actuator.id_sensor)}
                        >
                          Ver Historial
                        </button>
                      </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default ActuatorTable;
