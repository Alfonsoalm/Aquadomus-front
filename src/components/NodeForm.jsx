import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import buttonStyles from "../styles/Buttons.module.css";
import styles from "../styles/NodeForm.module.css";
import { GlobalModuleContext } from "../context/GlobalContext";

const NodeForm = ({ fields }) => {
  const { register, handleSubmit, reset } = useForm();
    const { insertNode } = useContext(GlobalModuleContext);

  const onSubmit = async (data) => {
    await insertNode(data); // Enviar los datos directamente, sin encriptar el token aquí
    reset();
  };

  return (
    <div className={styles.formContainer}>
      <h2>Registrar nuevo nodo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
        {fields.map((field, index) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            {...register(field, { required: true })}
            type={field === "token" ? "password" : "text"}
            className={index === 0 ? styles.fullWidth : ""}
          />
        ))}
        <button type="submit" variant="contained" className={`${buttonStyles.button} ${styles.fullWidth}`}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default NodeForm;