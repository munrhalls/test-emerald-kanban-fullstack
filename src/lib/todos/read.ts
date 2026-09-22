import { supabase } from "@/lib/supabase";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  position: number;
  created_at: string;
};

export async function listTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("position", { ascending: true });

  if (error) throw new Error(`listTodos: ${error.message}`);
  return data;
}
