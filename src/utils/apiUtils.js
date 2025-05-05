// apiUtils.js
import axios from "axios";
const IP_SERVER = "http://localhost:5000";

// Peticion al servidor para obtiene las IPs registradas
export const getIPs = async () => {
  const response = await axios.get(`${IP_SERVER}/nodes/get-ips`);
  if (response?.data?.success && response.data.data) {
    return response.data.data;
  } else {
    console.warn("La estructura de la respuesta no es la esperada:", response.data);
    return {};
  }
};

// Petición al servidor para registrar una nueva IP y Token (recibe valores encriptados)
export const registerNode = async (newNodeData) => {
  await axios.post(`${IP_SERVER}/nodes/insert-node`, newNodeData);
};

// Peticion al servidor para obtener sensores
export const getSensorsFromDB = async (id) => {
  console.log("Obteniendo sensores de base de datos");
  const response = await axios.get(`${IP_SERVER}/sensors/get-sensors`,{ params: { id } });
  // console.log("getSensorsFromDB", response.data.data);
  return response.data.data;
};

// Peticion al servidor para obtener datos de sensores
export const getDataSensorFromDB = async (sensorIds) => {
  console.log("Obteniendo informacion de los sensores en base de datos");
  const response = await axios.get(`${IP_SERVER}/sensors/get-data`,{ params: { sensorIds } });
  // console.log("getDataFromDB", response.data.data);
  return response.data.data;
};

export const getNodes = async () => {
  const response = await axios.get(`${IP_SERVER}/nodes/get-nodes`);
  return response.data.nodes;
}

export const getNodeFields = async () => {
  const response = await axios.get(`${IP_SERVER}/nodes/get-fields`);
  return response.data;
}
// ################################################################################################


// // Obtiene el estado del relay
// export const getState = async () => {
//   const response = await axios.get(`${IP_SERVER}/relay`);
//   return response.data.state;
// };

// // Cambia el estado del relay
// export const changeState = async (state) => {
//   await axios.post(`${IP_SERVER}/relay`, { state });
// };