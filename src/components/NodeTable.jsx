import React, { useState } from "react";
import { EditForm } from "./EditForm";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/Table.module.css";
import { usePagination } from "../hooks/usePagination"; // Importamos el hook
import Pagination from "./Pagination"; // Importamos el componente de paginación
import { sortEntities } from "../utils/sorting"; // Importamos la función de ordenamiento
import SearchBar from "./SearchBar"; // Importamos el componente de búsqueda

export const NodeTable = ({
  title,
  entities,
  columns,
  fields,
  onEdit,
  onDelete,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [filteredEntities, setFilteredEntities] = useState(entities); // Estado para las entidades filtradas

  // Usamos el hook de paginación
  const { currentPage, totalPages, nextPage, prevPage } = usePagination(filteredEntities);
  const allHeaders = [...columns, "Acciones"];

  // Ordenar los datos utilizando la función sortEntities
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // Usamos la función de ordenamiento importada
  const sortedEntities = sortEntities(filteredEntities, sortConfig);

  // Obtener las entidades para la página actual
  const paginatedEntities = sortedEntities.slice((currentPage - 1) * 5, currentPage * 5);

  // Manejar la búsqueda y filtrar las entidades
  const handleSearch = (searchTerm) => {
    const filtered = entities.filter((entity) => {
      return Object.values(entity).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEntities(filtered); // Actualizamos las entidades filtradas
  };

  const handleEditClick = (index, entity) => {
    setEditingRow(index);
    setFormData(entity);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleSave = (data) => {
    onEdit({ id: formData.id }, data);
    setEditingRow(null);
  };

  return (
    <div className={styles.tableContainer}>
      <h2>{title}</h2>
      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      <table className={styles.table}>
        <thead>
          <tr>
            {allHeaders.map((key) => (
              <th
                key={key}
                onClick={() => key !== "Acciones" && handleSort(key)}
                style={{ cursor: key !== "Acciones" ? "pointer" : "default" }}
              >
                {key}
                {sortConfig?.key === key &&
                  (sortConfig.direction === "asc" ? " \u2B06" : " \u2B07")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedEntities.map((entity, index) =>
            editingRow === index ? (
              <EditForm
                key={entity.id || index}
                fields={fields}
                initialData={formData}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <tr key={entity.id || index}>
                {columns.map((key) => (
                  <td key={key} className={key === "token" ? styles.tokenCell : ""}>
                    {entity[key]}
                  </td>
                ))}
                <td>
                  <IconButton size="small" onClick={() => handleEditClick(index, entity)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(entity)} >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Aquí utilizamos el componente de Paginación */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};
