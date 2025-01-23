"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type Remitente = {
  id: string;
  name: string;
  mail: string;
  cedula: string;
  institution: string;
};

export const columns: ColumnDef<Remitente>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "mail",
    header: "Correo",
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
  },
  {
    accessorKey: "institution",
    header: "Institución",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const remitente = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                // Lógica para editar
                console.log("Editar", remitente);
              }}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Lógica para eliminar
                console.log("Eliminar", remitente);
              }}
              className="text-red-500"
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
