import { useCallback, useContext, useEffect, useState } from "react";
import { fetchHistoricalSensorData, handleAsync } from "../utils/dataUtils";
import { useParams } from "react-router-dom";
import { GlobalModuleContext } from "../context/GlobalContext";

export const useSensorHistorical = (sensor) => {
  const [historicalData, setHistoricalData] = useState([]);
    const { getDataSensorFromDB } = useContext(GlobalModuleContext);
  const { sensorId } = useParams();

  const fetchHistorical = useCallback(async () => {
    return handleAsync(async () => {
      const data = await getDataSensorFromDB(sensorId);
      console.log("data", data);
      console.log("sensor", sensor);
      const historical = fetchHistoricalSensorData(data, [{ id: sensor }]);
      console.log("historical", historical);
      setHistoricalData(historical);
    });
  }, [sensor, sensorId, getDataSensorFromDB]);

  useEffect(() => {
    if (sensor) {
      fetchHistorical();
    }
  }, [sensor, fetchHistorical]);

  return {
    historicalData,
  };
};
