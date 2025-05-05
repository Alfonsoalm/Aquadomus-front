import React from "react";
import NodeSelector from "../components/NodeSelector";
import SensorTable from "../components/SensorTable";
import ActuatorTable from "../components/ActuatorTable";
import useSensorsData from "../hooks/useSensorsData";
import { useIpData } from "../hooks/useIpData";
import { useParams } from "react-router-dom";
import useActuatorsData from "../hooks/useActuatorsData";

export const InfoPage = () => {
  const { id } = useParams();
  const { ipData, selectedIPId, handleNodeChange } = useIpData(id);
  const { handleSensorChange, sensorData } = useSensorsData(selectedIPId);
  const { handleActuatorChange, changeState, actuatorData, setOnState, setOffState } = useActuatorsData(selectedIPId);

  return (
    <>
      <NodeSelector
        changeNode={handleNodeChange}
        selectedIPId={selectedIPId}
        ipData={ipData}
      />
      <>
        {/* Solo muestra la tabla si NO se está viendo historial */}
        {selectedIPId && (
          <SensorTable changeSensor={handleSensorChange} sensors={sensorData} />
        )}
        {selectedIPId && (
          <ActuatorTable 
          changeActuator={handleActuatorChange} 
          actuators={actuatorData} 
          setOnState={setOnState}
          setOffState={setOffState}
          changeState={changeState}
          />
        )}
      </>
    </>
  );
};
