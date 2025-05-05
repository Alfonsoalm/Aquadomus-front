import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormField from "./FormField";
import formStyles from "../styles/EditForm.module.css";

export const EditForm = ({ fields, initialData, onSave, onCancel }) => {
  const [options] = useState(["admin", "manager", "staff", "intern"]); // Opciones para roles
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return (
    <tr className={formStyles.editForm}>
      {fields.map((field) => (
        <FormField
          key={field.key}
          field={field}
          register={register}
          error={!!errors[field.name]}
          options={field.type === "select" ? options : undefined}
        />
      ))}
      <td>
        <button type="button" className="table-button save" onClick={handleSubmit(onSave)}>
          Guardar
        </button>
        <button type="button" className="table-button cancel" onClick={onCancel}>
          Cancelar
        </button>
      </td>
    </tr>
  );
};

export default EditForm;
