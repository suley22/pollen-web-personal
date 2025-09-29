import { useState} from "react";

export function useUserInfo() {
   const [form, setForm] = useState({
     first_name: "",
     last_name: "",
     pronouns: "He/Him",
   });

   function handleChange(e) {
     const propertyName = e.target.name;
     let propertyValue = e.target.value;

     if (propertyName === 'first_name' || propertyName === 'last_name') {
       // Solo permitir letras, espacios y caracteres con acentos
       propertyValue = propertyValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
     }

     setForm({ ...form, [propertyName]: propertyValue });
   }

  return {
    form: {
      ...form,
      handleChange: handleChange,
    },
  };
}
