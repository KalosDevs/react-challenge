import { useState } from "react";
import { Errors } from "../types/errors";

export function useFormValidation() {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (values: { "document-number": string; phone: string }, docType: string) => {
    const newErrors: Errors = {};

    if (docType === "dni") {
      if (!/^\d{8}$/.test(values["document-number"])) {
        newErrors["document-number"] = "El DNI debe tener 8 dígitos numéricos.";
      }
    } else if (!values["document-number"]) {
      newErrors["document-number"] = "Este campo es obligatorio.";
    }

    if (!/^\d{9}$/.test(values.phone)) {
      newErrors.phone = "El celular debe tener 9 dígitos numéricos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof Errors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return { errors, validate, clearError };
}