import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const apiUrl: string = import.meta.env.VITE_PROJECT_URL;
const apiKey: string = import.meta.env.VITE_ANON_KEY;

const supabase = createClient<Database>(apiUrl, apiKey);

export default supabase;