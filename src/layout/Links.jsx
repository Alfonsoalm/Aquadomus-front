import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Links.module.css'; // Ajusta si está en otro sitio

export const Links = ({ navLinks }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map(({ to, label }) => (
          <div key={to} className={styles.navItem}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            {label}
          </NavLink>
          </div>
        ))}
      </ul>
    </nav>
  );
};
