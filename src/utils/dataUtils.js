// Maneja errores en funciones asíncronas
export const handleAsync = async (asyncFunction) => {
    try {
      return await asyncFunction();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
// Obtiene el dato más reciente de cada sensor
export const fetchLatestSensorData = (sensorData, sensors) => {
  const sensorIds = new Set(sensors.map((sensor) => sensor.id));
  const filteredData = sensorData.filter((data) =>
    sensorIds.has(data.id_sensor)
  );
  const latestDataMap = {};
  filteredData.forEach((data) => {
    const current = latestDataMap[data.id_sensor];
    if (!current || new Date(data.fecha_hora) > new Date(current.fecha_hora)) {
      latestDataMap[data.id_sensor] = data;
    }
  });
  return Object.values(latestDataMap);
};
  
// Filtra todos los datos históricos de los sensores
export const fetchHistoricalSensorData = (sensorData, sensors) => {
  console.log(sensors)
  const sensorIds = new Set(sensors.map((sensor) => sensor.id));
  return sensorData.filter((data) => sensorIds.has(data.id_sensor));
};