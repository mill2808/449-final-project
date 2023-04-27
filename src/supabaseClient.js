import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js@2.21.0";

const supabaseUrl = 'https://gvwfsodobablajramtmd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2d2Zzb2RvYmFibGFqcmFtdG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1MzcwOTksImV4cCI6MTk5ODExMzA5OX0.PC2uGXx2RRgSlv4sOAxgsUeJL3UQkausScEQisyzG_g'

export const supabase = createClient(supabaseUrl, supabaseKey)