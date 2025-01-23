import { supabase } from "@/utils//supabase/supabase";

export const useRemitentes = () => {
  const fetchRemitentes = async () => {
    const { data, error } = await supabase.from("reminent").select("*");

    if (error) {
      console.error("Error al obtener remitentes:", error.message);
      throw new Error(error.message);
    }
    return data;
  };

  const createRemitente = async (remitente: {
    name: string;
    email: string;
    document: string;
    institution: string;
  }) => {
    const { data, error } = await supabase
      .from("reminent")
      .insert([remitente])
      .select();

    if (error) {
      console.error("Error al crear remitente:", error.message);
      throw new Error(error.message);
    }
    return data;
  };

  const updateRemitente = async (
    id: string,
    remitente: Partial<{
      name: string;
      email: string;
      document: string;
      institution: string;
    }>
  ) => {
    const { data, error } = await supabase
      .from("reminent")
      .update(remitente)
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar remitente:", error.message);
      throw new Error(error.message);
    }
    return data;
  };

  const deleteRemitente = async (id: string) => {
    const { error } = await supabase.from("reminent").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar remitente:", error.message);
      throw new Error(error.message);
    }
  };

  return { fetchRemitentes, createRemitente, updateRemitente, deleteRemitente };
};
