import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { mapFields } from "../utils/fields";
import { encryptData } from "../utils/cryptoUtils";
export const GlobalModuleContext = createContext(undefined);

export const GlobalModuleProvider = ({ children }) => {
  const IP_SERVER = process.env.SERVER_IP;
  const [nodes, setNodes] = useState([]);
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async (asyncFunction) => {
    setIsLoading(true);
    try {
      return await asyncFunction();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getIPs = useCallback( async () => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/nodes/get-ips`);
      if (response?.data?.success && response.data.data) return response.data.data;
      });
  }, []);

  const getNodes = useCallback(async (filters = {}) => {
		return handleCheck(async () => {
			const response = await axios.get(`${IP_SERVER}/nodes/get-nodes`);
      setNodes(response.data.data)
			return response.data;
		});
  }, []);

  const insertNode = useCallback(async (newNodeData) => {
    return handleCheck(async () => {
      const encryptedToken = encryptData(newNodeData.token);
      const nodeData = { ...newNodeData, token: encryptedToken };
      const response = await axios.post(`${IP_SERVER}/nodes/insert-node`, nodeData);
      return response.data;
    });
  }, []);

  const editNode = useCallback(async (filters, updates) => {
    return handleCheck(async () => {
      if (updates.token) {
        updates.token = encryptData(updates.token);
      }
      const response = await axios.put(`${IP_SERVER}/nodes/update-node`, {
        filters,
        updates,
      });
      return response.data;
    });
  }, []);
  
  const deleteNode = useCallback(async (id) => {
    return handleCheck(async () => {
      const response = await axios.delete(`${IP_SERVER}/nodes/delete-node`, { data: { id } });
      return response.data;
    });
  }, []);
  
  const getNodesFields = useCallback(async () => {
    return handleCheck(async () => {
	    const response = await axios.get(`${IP_SERVER}/nodes/get-fields`);
      const mappedFields = mapFields(response.data.data);
      setFields(mappedFields);
      return mappedFields;
    });
  }, []);

  const getSensorsFromDB = useCallback(async(id) => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/sensors/get-sensors`,{ params: { id } });
      return response.data.data;
    });
  },[]);

  const getDataSensorFromDB = useCallback(async (sensorIds) => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/sensors/get-data`,{ params: { sensorIds } });
      return response.data.data;
    });
  },[]);

  const getActuatorsFromDB = useCallback(async(id) => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/actuators/get-actuators`,{ params: { id } });
      return response.data.data;
    })
  }, [])

  const getDataActuatorFromDB = useCallback(async(actuatorsIds) => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/actuators/get-data`,{ params: { actuatorsIds } });
      return response.data.data;
    })
  }, [])

  const setActuatorState = useCallback(async(id, state) => {
    return handleCheck(async () => {
      console.log("Modificar actuador de id ", id, state)  

      const response = await axios.post(`${IP_SERVER}/actuators/set-state`, {
        id,
        state
      });
      console.log("Estado de actuador modificado", response.data.data);
      return response.data.data;
    })
  }, [])

  const getActuatorState = useCallback(async(id) => {
    return handleCheck(async () => {
      const response = await axios.get(`${IP_SERVER}/actuators/get-state`,  { params:{ id } });
      console.log("Estado de actuador modificado", response.data.data);
      return response.data.data;
    })
  }, [])


    // Nueva función para obtener el tamaño de las tablas
    const getDatabaseSize = useCallback(async () => {
      return handleCheck(async () => {
        const res = await axios.get(`${IP_SERVER}/database/get-size`);
        console.log("res", res.data)
        return res.data.data;
      });
    }, []);
  
    // Nueva función para obtener el tamaño de cada tabla (nodes, sensors, sensorData)
    const getTableSize = useCallback(async (tableDatabase) => {
      return handleCheck(async () => {
        const res = await axios.get(`${IP_SERVER}/database/get-table-size`, {
          params: { tableDatabase }, // Debería ser correcto, pero asegúrate de que el backend lo espera correctamente
        });
        console.log("res", res.data)
        return res.data.data;
      });
    }, []);
  
    // Nueva función para borrar los datos de una tabla específica
    const deleteTableData = useCallback(async (tableDatabase) => {
      return handleCheck(async () => {
        const res = await axios.post(`${IP_SERVER}/database/delete-data`, {
          tableDatabase
        });
        console.log("res", res.data)
        return res.data.data;
      });
    }, []);

  return (
    <GlobalModuleContext.Provider
      value={{
        nodes,
        fields,
        isLoading,

        getIPs,
        getNodes,
        insertNode,
        deleteNode,
        editNode,
        getNodesFields,

        getSensorsFromDB,
        getDataSensorFromDB,

        getActuatorsFromDB,
        getDataActuatorFromDB,
        setActuatorState,
        getActuatorState,

        getDatabaseSize,
        getTableSize,
        deleteTableData,
      }}
    >
      {children}
    </GlobalModuleContext.Provider>
  );
};

export default GlobalModuleProvider;
