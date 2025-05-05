import { useState, useEffect, useCallback, useContext } from "react";
import { handleAsync } from "../utils/dataUtils";
import { useNavigate } from "react-router-dom";
import { GlobalModuleContext } from "../context/GlobalContext";

export const useIpData = (initialId) => {
  const [ipData, setIpData] = useState({});
  const { getIPs } = useContext(GlobalModuleContext);
  const [selectedIPId, setSelectedIPId] = useState(initialId);
  const navigate = useNavigate();

  const fetchIPs = useCallback(async () => {
    return handleAsync(async () => {
      const ipData = await getIPs();
      setIpData(ipData);
    });
  }, [getIPs]);

  const handleNodeChange = (id) => {
    setSelectedIPId(id);
    navigate(`/selection/${id}`);
  };

  useEffect(() => {
    fetchIPs();
  }, [fetchIPs, initialId]);

  return {
    ipData,
    selectedIPId,
    handleNodeChange,
  };
};
