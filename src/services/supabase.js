import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jlqphhbdoaxaidsdhter.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpscXBoaGJkb2F4YWlkc2RodGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExODgyODcsImV4cCI6MjA0Njc2NDI4N30.8_pfsWrXrLvnTtA8PKnMJjNFqACLQGf1dqP0JkQlAH0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
