import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
