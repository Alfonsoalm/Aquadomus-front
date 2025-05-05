import React from "react";
import SensorHistoryChart from "../components/SensorHistoryChart";
import { useParams } from "react-router-dom";
import { useSensorHistorical } from "../hooks/useSensorHistorical";

export const SensorPage = () => {
  const { sensorId } = useParams();
  const { historicalData } = useSensorHistorical(Number(sensorId));
  console.log("sensorId", sensorId);
  console.log("historicalData", historicalData);
  return (
    sensorId &&
    historicalData.length > 0 && (
      <SensorHistoryChart sensorHistory={historicalData} />
    )
  );
};
