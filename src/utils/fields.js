// Función para mapear los tipos SQL a tipos de inputs HTML
export const mapType = (sqlType) => {
  if (sqlType.includes("varchar") || sqlType.includes("text")) return "text";
  if (sqlType.includes("enum")) return "select";
  if (sqlType.includes("int")) return "number";
  if (sqlType.includes("float")) return "number";
  if (sqlType.includes("date")) return "date";
  return "text";
};

// Función para generar etiquetas amigables a partir del nombre del campo
export const generateLabel = (fieldName) => {
  return fieldName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const mapFields = (dataField = []) => {
  if (!Array.isArray(dataField)) {
    console.error("dataField no es un arreglo:", dataField);  // Agrega esta línea
    return []; 
  }
  return dataField
      .filter((field) => field?.Field.toLowerCase() !== "id")
      .map((field) => ({
          key: field.Field,
          name: field.Field,
          label: generateLabel(field.Field),
          type: field.Field === "photo_url" ? "file" : mapType(field.Type),
          validationRules: field.Null === "NO" ? { required: `${field.Field} es obligatorio` } : {},
      }));
};

