import React from "react";
import buttonStyles from "../styles/Buttons.module.css"; // Asegúrate de importar los estilos correctos
import styles from "../styles/Pagination.module.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className={styles.pagination}>
      <button 
        className={buttonStyles.button} 
        onClick={prevPage} 
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button 
        className={buttonStyles.button} 
        onClick={nextPage} 
        disabled={currentPage >= totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
