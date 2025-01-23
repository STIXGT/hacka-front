import { createClient } from "@/utils/supabase/server";

// Definimos el tipo para los remitentes
export type Remitente = {
  id?: string;
  name: string;
  email: string;
  document: string;
  institution: string;
};

export const useRemitentes = () => {
  // Centralizamos la creación del cliente Supabase
  const getSupabaseClient = async () => {
    return await createClient();
  };

  const fetchRemitentes = async (): Promise<Remitente[]> => {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("reminent").select("*");

    if (error) {
      console.error("Error al obtener remitentes:", error.message);
      throw new Error("No se pudieron obtener los remitentes.");
    }

    return data as Remitente[];
  };

  const createRemitente = async (remitente: Remitente): Promise<Remitente[]> => {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("reminent").insert([remitente]).select();

    if (error) {
      console.error("Error al crear remitente:", error.message);
      throw new Error("No se pudo crear el remitente.");
    }

    return data as Remitente[];
  };

  const updateRemitente = async (id: string, remitente: Partial<Remitente>): Promise<Remitente[]> => {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from("reminent").update(remitente).eq("id", id).select();

    if (error) {
      console.error("Error al actualizar remitente:", error.message);
      throw new Error("No se pudo actualizar el remitente.");
    }

    return data as Remitente[];
  };

  const deleteRemitente = async (id: string): Promise<void> => {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from("reminent").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar remitente:", error.message);
      throw new Error("No se pudo eliminar el remitente.");
    }
  };

  return { fetchRemitentes, createRemitente, updateRemitente, deleteRemitente };
};
