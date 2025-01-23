"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import AddRemitentModal from "@/components/AddRemitentModal";

interface Remitente {
  name: string;
  email: string;
  idNumber: string;
  institution: string;
}

const columns: ColumnDef<Remitente>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "idNumber",
    header: "Cédula",
  },
  {
    accessorKey: "institution",
    header: "Institución",
  },
];

export default function ReminentView() {
  const [remitentes, setRemitentes] = useState<Remitente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleAddRemitent = (data: Remitente) => {
    setRemitentes((prev) => [...prev, data]);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <Button onClick={toggleModal} className="self-end">
        Agregar Remitente
      </Button>
      <DataTable columns={columns} data={remitentes} />
      <AddRemitentModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleAddRemitent}
      />
    </div>
  );
}
