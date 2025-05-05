import React from 'react'
import AppRouter from '../router/AppRouter'
import styles from "../../src/index.module.css";

export const Central = () => {
  return (
    <div className={styles.appContent}>
      <div className={styles.content}>
      <AppRouter />
      </div>
    </div>
  )
}
