"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RemitentFormProps = {
  onSubmit: (values: {
    name: string;
    mail: string;
    document: string;
    institution: string;
  }) => void;
  defaultValues?: {
    name: string;
    mail: string;
    document: string;
    institution: string;
  };
  onCancel: () => void;
};

export default function RemitentForm({ onSubmit, defaultValues, onCancel }: RemitentFormProps) {
  const [formValues, setFormValues] = useState(defaultValues || { name: "", mail: "", document: "", institution: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Nombre"
        value={formValues.name}
        onChange={handleChange}
        required
      />
      <Input
        name="mail"
        placeholder="Correo"
        value={formValues.mail}
        onChange={handleChange}
        required
      />
      <Input
        name="document"
        placeholder="Cédula"
        value={formValues.document}
        onChange={handleChange}
        required
      />
      <Input
        name="institution"
        placeholder="Institución"
        value={formValues.institution}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
