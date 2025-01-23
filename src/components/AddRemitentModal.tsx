"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  email: z.string().email("Correo inválido."),
  idNumber: z.string().min(10, "La cédula debe tener al menos 10 caracteres."),
  institution: z.string().min(1, "La institución es obligatoria."),
});

type FormData = z.infer<typeof formSchema>;

interface AddRemitentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export default function AddRemitentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRemitentModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      idNumber: "",
      institution: "",
    },
  });

  function handleFormSubmit(data: FormData) {
    onSubmit(data);
    form.reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Agregar Remitente
        </h2>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nombre
            </label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Correo
            </label>
            <Input id="email" {...form.register("email")} />
          </div>
          <div>
            <label htmlFor="idNumber" className="block font-medium text-gray-700">
              Cédula
            </label>
            <Input id="idNumber" {...form.register("idNumber")} />
          </div>
          <div>
            <label htmlFor="institution" className="block font-medium text-gray-700">
              Institución
            </label>
            <Input id="institution" {...form.register("institution")} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
