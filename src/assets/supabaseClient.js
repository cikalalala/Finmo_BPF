import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uboyabrkrvgmqlcflzbu.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVib3lhYnJrcnZnbXFsY2ZsemJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDg0OTQsImV4cCI6MjA2NTkyNDQ5NH0.RzxoO3DGILBzcNfQcf_lGdqq3D5k8ydsM4k9_4HuNtc"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
