import React, { useContext, useEffect, useState } from "react";
import { GlobalModuleContext } from "../context/GlobalContext";
import { useNodes } from "../hooks/useNodes";
import { NodeTable } from "../components/NodeTable";

export const NodePage = () => {
  const { isLoading, nodes, fields, getNodes, getNodesFields } = useContext(GlobalModuleContext);
  const { handleDeleteNode, handleEditNode } = useNodes();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getNodes();
    getNodesFields();
  }, [getNodes, getNodesFields]);

  useEffect(() => {
    setColumns(fields.map((field) => field.key));
  }, [fields]);

  if (isLoading) {
    return <></>;
  }

  return (
      <NodeTable
        title="Lista de domicilios"
        entities={nodes}
        columns={columns}
        fields={fields}
        onEdit={handleEditNode}
        onDelete={handleDeleteNode}
      />
  );
};
