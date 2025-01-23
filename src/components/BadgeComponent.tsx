"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

export function BadgeComponent({
  sender,
  dataSender,
  setDataSender,
}: {
  sender: { name: string; email: string; cedula: string; institution: string };
  dataSender: any;
  setDataSender: any;
}) {
  function handleDelete() {
    setDataSender(
      dataSender.filter((item: any) => item.cedula !== sender.cedula)
    );
  }
  return (
    <Badge className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-900 text-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
      <span className="font-medium">{sender.name}</span>
      <Button
        onClick={handleDelete}
        className="ml-3 flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 ease-in-out"
      >
        ×
      </Button>
    </Badge>
  );
}
