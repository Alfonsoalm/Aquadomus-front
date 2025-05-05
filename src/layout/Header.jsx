import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Links } from "./Links";
import styles from "../styles/Header.module.css"; // Importar estilos del módulo
import { useNavigate } from "react-router-dom";
// import logo from "../assets/AQUADOMUS_logo2.png"; // Importar la imagen del logo

const navLinks = [
  { to: "/register", label: "Registro" },
  { to: "/nodes", label: "Domicilios" },
  { to: "/selection", label: "Selección" },
  { to: "/alerts", label: "Alertas" },
  { to: "/settings", label: "Ajustes" },
];

const Header = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* <div className={styles.logoTitleContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          </div> */}
        <h1 className={styles.title}>Aquadomus</h1>
        <Links navLinks={navLinks} />
        <div className={styles.backButton}>
          <IconButton
            onClick={onBack}
            sx={{ color: "#ffffff" }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
