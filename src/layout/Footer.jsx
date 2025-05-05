import React from "react";
import cetemetLogo from "../assets/cetemet_logo.png";
import smartCityLogo from "../assets/smart-city-cluster_logo.png";
import synergiaLogo from "../assets/synergia_logo.png";
import ucoLogo from "../assets/uco_logo.png";
import juntaLogo from "../assets/junta-andalucia_logo.png";
import financiacionlogos from "../assets/logos_financiacion.png";
import ueLogo from "../assets/ue_logo.png";
import haciendaLogo from "../assets/logos_haciendo.png";
import styles from "../styles/Footer.module.css"; // Ajusta ruta si necesario

const Footer = () => {
  const logos = [cetemetLogo, smartCityLogo, synergiaLogo, ucoLogo, juntaLogo, ueLogo, haciendaLogo, financiacionlogos];

  return (
    <div className={styles.footer}>
      {logos.map((logo, index) => (
        <img 
          key={index} 
          src={logo} 
          alt={`logo-${index}`} 
          className={styles.logo} 
        />
      ))}
    </div>
  );
};

export default Footer;
