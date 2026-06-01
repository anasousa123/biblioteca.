import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://msdnrjegnbvqwrnfdwkq.supabase.co/rest/v1/";
const supabaseKey = "SUA_CHAVE_ANON";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);