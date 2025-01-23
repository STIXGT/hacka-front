"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle, UserPlus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Sender {
  name: string;
  email: string;
  cedula: string;
  institution: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nombre de remitente debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un email válido.",
  }),
  cedula: z.string().regex(/^\d{10}$/, {
    message: "Cédula debe tener exactamente 10 dígitos.",
  }),
  institution: z.string().min(2, {
    message: "Institución debe tener al menos 2 caracteres.",
  }),
});

export function ProfileForm() {
  const { toast } = useToast();
  const [dataSender, setDataSender] = useState<Sender[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cedula: "",
      institution: "",
    },
  });

  // Manejar el envío de un nuevo sender
  async function handleAddSender() {}

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (dataSender.length < 3) {
      setDataSender([...dataSender, values]);
      form.reset();
      setIsAddDialogOpen(false);

      toast({
        title: "Remitente Agregado",
        description: "Se ha añadido un nuevo remitente exitosamente.",
        variant: "default",
        duration: 2000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Límite Alcanzado",
        description: "No puedes agregar más de 3 remitentes.",
      });
    }
  }

  function removeSender(indexToRemove: number) {
    setDataSender(dataSender.filter((_, index) => index !== indexToRemove));
  }

  async function handleNextPage() {
    if (dataSender.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes agregar al menos un remitente.",
      });
    } else {
      handleAddSender();
      // Insertar remitentes en la base de datos

      toast({
        variant: "success",
        title: "Éxito",
        description: "Remitentes agregados correctamente.",
      });

      window.location.href = "/dashboard/";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center p-4">
      <Toaster />
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="bg-neutral-800 text-neutral-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <UserPlus className="w-6 h-6" />
            Registro de Remitentes
          </CardTitle>
          <CardDescription className="text-neutral-300">
            Agrega hasta 3 remitentes para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Sender List */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {dataSender.map((sender, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 p-2 bg-neutral-200 text-neutral-800"
              >
                {sender.name}
                <XCircle
                  className="w-4 h-4 cursor-pointer text-neutral-600 hover:text-neutral-900"
                  onClick={() => removeSender(index)}
                />
              </Badge>
            ))}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-800">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre completo"
                        {...field}
                        className="focus:ring-2 focus:ring-neutral-500 border-neutral-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-800">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@dominio.com"
                        {...field}
                        className="focus:ring-2 focus:ring-neutral-500 border-neutral-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-800">Cédula</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Número de identificación"
                        {...field}
                        className="focus:ring-2 focus:ring-neutral-500 border-neutral-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-800">
                      Institución
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la institución"
                        {...field}
                        className="focus:ring-2 focus:ring-neutral-500 border-neutral-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-50"
              >
                Agregar Remitente
              </Button>
            </form>
          </Form>

          {/* Next Button */}
          <Button
            onClick={handleNextPage}
            disabled={dataSender.length === 0}
            className="w-full mt-4 bg-blue-950 hover:bg-blue-800 text-neutral-50 transition-colors"
          >
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileForm;
