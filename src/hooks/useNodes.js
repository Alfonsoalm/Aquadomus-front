import { useCallback, useContext, useEffect } from "react";
import { GlobalModuleContext } from "../context/GlobalContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; // 

export const useNodes = () => {
  const MySwal = withReactContent(Swal); // Para integrar SweetAlert con React
  const { getNodes, getNodesFields, 
		insertNode,
		deleteNode,
		editNode} = useContext(GlobalModuleContext);

  useEffect(() => {
    getNodes();
		getNodesFields();
  }, [getNodes, getNodesFields]);

  const handleAddNode = useCallback(async (data) => {
    try {
      await insertNode(data);
      getNodes();
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar el empleado.");
    }
  }, [insertNode, getNodes]);

  const handleDeleteNode = useCallback(
    async (item) => {
      console.log("handleDeleteNode item", item.id);
      if (!item.id) return;

      // En lugar de window.confirm, usamos SweetAlert2:
      const result = await MySwal.fire({
        title: "Aquadomus pregunta",
        text: `¿Eliminar a ${item.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        background: "rgba(255, 255, 255, 0.8)", // Fondo semitransparente
      });

      // SweetAlert2 devuelve un objeto con la propiedad 'isConfirmed'
      if (result.isConfirmed) {
        try {
          await deleteNode(item.id);
          getNodes();
          Swal.fire("Eliminado", `El nodo ${item.nombre} se eliminó con éxito.`, "success");
        } catch (error) {
          console.error("Error al eliminar:", error);
          Swal.fire("Error", "Error al eliminar el empleado.", "error");
        }
      }
    },
    [deleteNode, getNodes, MySwal]
  );

  const handleEditNode = useCallback(async (filters, updates) => {
    try {
      console.log("handleEditNode filters", filters, "updates", updates)
      await editNode(filters, updates);
      getNodes();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el ítem.");
    }
  }, [editNode, getNodes]);

  return {
    handleAddNode,
    handleDeleteNode,
    handleEditNode,
  };
};
