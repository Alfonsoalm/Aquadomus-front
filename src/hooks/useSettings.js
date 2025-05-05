// hooks/useSettings.js
import { useContext, useState } from "react";
import { GlobalModuleContext } from "../context/GlobalContext";

export const useSettings = () => {
  const {
    getDatabaseSize,
    getTableSize,
    deleteTableData,
  } = useContext(GlobalModuleContext);

  const [dbSize, setDbSize] = useState(null);
  const [tableSizes, setTableSizes] = useState({});
  const [deletionMessage, setDeletionMessage] = useState("");

  const fetchDbSize = async () => {
    const res = await getDatabaseSize();
    setDbSize(res?.data);
  };

  const fetchTableSize = async (table) => {
    const res = await getTableSize(table);
    setTableSizes((prev) => ({ ...prev, [table]: res?.data }));
  };

  const clearTableData = async (table) => {
    if (window.confirm(`¿Estás seguro de borrar los datos de "${table}"?`)) {
      const res = await deleteTableData(table);
      setDeletionMessage(res?.message);
    }
  };

  return {
    dbSize,
    tableSizes,
    deletionMessage,
    fetchDbSize,
    fetchTableSize,
    clearTableData,
  };
};
