"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { columns, Remitente } from "./columns";
import RemitentForm from "./RemitentForm";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabase";

export default function RemitentePage() {
  const [data, setData] = useState<Remitente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRemitente, setEditingRemitente] = useState<Remitente | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data only once
  useEffect(() => {
    const fetchRemitentes = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("reminent").select("*");
      if (error) {
        console.error("Error fetching remitentes:", error.message);
      } else {
        setData(data);
      }
      setIsLoading(false);
    };

    fetchRemitentes();
  }, []);

  // Function to add or update a remitente
  const addOrUpdateRemitente = async (remitente: Remitente) => {
    try {
      if (editingRemitente) {
        // Update existing remitente
        const { data: updatedData, error } = await supabase
          .from("reminent")
          .update(remitente)
          .eq("id", editingRemitente.id)
          .select();

        if (error) throw new Error(error.message);
        setData((prev) =>
          prev.map((item) => (item.id === editingRemitente.id ? updatedData[0] : item))
        );
      } else {
        // Create new remitente
        const { data: newData, error } = await supabase.from("reminent").insert(remitente).select();
        if (error) throw new Error(error.message);
        setData((prev) => [...prev, newData[0]]);
      }

      setIsModalOpen(false);
      setEditingRemitente(null);
    } catch (error) {
      console.error("Error saving remitente:", error.message);
    }
  };

  // Function to handle deletion
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("reminent").delete().eq("id", id);
      if (error) throw new Error(error.message);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting remitente:", error.message);
    }
  };

  const handleEdit = (remitente: Remitente) => {
    setEditingRemitente(remitente);
    setIsModalOpen(true);
  };

  const tableColumns = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  ...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }
      : col
  );

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Gestión de Remitentes</h1>
      <div className="flex justify-center sm:justify-start mb-6">
        <Button onClick={() => setIsModalOpen(true)}>Agregar Remitente</Button>
      </div>
      {isLoading ? (
        <div className="text-center">Cargando datos...</div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={tableColumns} data={data} />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-lg">
            <RemitentForm
              onSubmit={addOrUpdateRemitente}
              defaultValues={editingRemitente || undefined}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingRemitente(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
