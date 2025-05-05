import React from "react";
import styles from "../styles/FormField.module.css"

export const FormField = ({ field, register, error, options }) => {
  return (
    <td className={styles.formField}>
      {field.type === "select" ? (
        <select {...register(field.name, field.validationRules)}>
          <option value="">{field.placeholder || "Seleccione una opción"}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          {...register(field.name, field.validationRules)}
          placeholder={field.placeholder || `${field.label.toLowerCase()}`}
        />
      )}
      {error && <span className="error-message">Campo requerido</span>}
    </td>
  );
};

export default FormField;
