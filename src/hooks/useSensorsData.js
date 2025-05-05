import { useState, useEffect, useCallback, useContext } from "react";
import { handleAsync, fetchLatestSensorData } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";
import { GlobalModuleContext } from "../context/GlobalContext";

const useSensorsData = (selectedIPId) => {
  const [sensors, setSensors] = useState([]);
  const { getSensorsFromDB, getDataSensorFromDB } = useContext(GlobalModuleContext);
  const [sensorData, setSensorData] = useState([]);
  const navigate = useNavigate();

  const handleSensorChange = (sensorId) => {
    navigate(`/selection/${selectedIPId}/${sensorId}`);
  };

  const fetchSensors = useCallback(async () => {
    return handleAsync(async () => {
      if (!selectedIPId) return;
      const sensors = await getSensorsFromDB(selectedIPId);
      setSensors(sensors);
    });
  }, [selectedIPId, getSensorsFromDB]);

  const fetchData = useCallback(async () => {
    return handleAsync(async () => {
      if (sensors.length === 0) return;

      // Obtener array de ids reales desde los sensores
      const sensorIds = sensors.map((sensor) => sensor.id);

      // Llamar a getDataSensorFromDB con esas ids
      const data = await getDataSensorFromDB(sensorIds);

      // Obtener datos más recientes (usa sensorData actualizado)
      const latestData = fetchLatestSensorData(data, sensors);
      setSensorData(latestData);
    });
  }, [sensors, getDataSensorFromDB]);

  useEffect(() => {
    if (selectedIPId) {
      fetchSensors();
    }
  }, [fetchSensors, selectedIPId]);

  useEffect(() => {
    if (sensors.length > 0) {
      fetchData();
    }
  }, [sensors, fetchData]);

  return {
    handleSensorChange,
    sensorData,
  };
};

export default useSensorsData;
