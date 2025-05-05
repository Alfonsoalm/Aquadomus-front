// components/SearchBar.jsx
import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css"

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Llamamos a onSearch para filtrar los datos
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBar;
