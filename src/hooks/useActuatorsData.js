import { useState, useEffect, useCallback, useContext } from "react";
import { handleAsync, fetchLatestSensorData } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";
import { GlobalModuleContext } from "../context/GlobalContext";

const useActuatorsData = (selectedIPId) => {
  const [actuators, setActuators] = useState([]);
  const {
    getActuatorsFromDB,
    getDataActuatorFromDB,
    setActuatorState,
    getActuatorState,
  } = useContext(GlobalModuleContext);
  const [actuatorData, setActuatorData] = useState([]);
  const navigate = useNavigate();

  const handleActuatorChange = (actuatorId) => {
    navigate(`/selection/${selectedIPId}/${actuatorId}`);
  };

  const fetchActuators = useCallback(async () => {
    return handleAsync(async () => {
      if (!selectedIPId) return;
      const actuators = await getActuatorsFromDB(selectedIPId);
      setActuators(actuators);
    });
  }, [selectedIPId, getActuatorsFromDB]);

  const fetchData = useCallback(async () => {
    return handleAsync(async () => {
      if (actuators.length === 0) return;
      // Obtener array de ids reales desde los sensores
      const actuatorsIds = actuators.map((sensor) => sensor.id);
      // Llamar a getDataSensorFromDB con esas ids
      const data = await getDataActuatorFromDB(actuatorsIds);
      // Obtener datos más recientes (usa sensorData actualizado)
      const latestData = fetchLatestSensorData(data, actuators);
      setActuatorData(latestData);
    });
  }, [actuators, getDataActuatorFromDB]);

  // Función para cambiar el estado a "on"
  const setOnState = async (id) => {
    try {
      console.log(id);
      await setActuatorState(id, "on");
      console.log(`Actuador ${id} cambiado a "on"`);
      await fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado del actuador:", error);
      alert("Error al cambiar el estado del actuador.");
    }
  };

  // Función para cambiar el estado a "off"
  const setOffState = async (id) => {
    try {
      console.log(id);
      await setActuatorState(id, "off");
      console.log(`Actuador ${id} cambiado a "off"`);
      await fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado del actuador:", error);
      alert("Error al cambiar el estado del actuador.");
    }
  };

  // Función para obtener el estado actual
  const getCurrentState = async (id) => {
    try {
      const currentState = await getActuatorState(id);
      return currentState;
    } catch (error) {
      console.error("Error al obtener el estado del actuador:", error);
      alert("Error al obtener el estado del actuador.");
    }
  };

  useEffect(() => {
    if (selectedIPId) {
      console.log("Cambio de ID de IP seleccionado:", selectedIPId);
      setActuators([]);
      setActuatorData([]);
      fetchActuators();
    }
  }, [fetchActuators, selectedIPId]);

  useEffect(() => {
    if (actuators !== null && actuators.length > 0) {
      fetchData();
    }
  }, [actuators, fetchData]);

  return {
    handleActuatorChange,
    setOnState,
    setOffState,
    getCurrentState,
    actuatorData,
  };
};

export default useActuatorsData;
