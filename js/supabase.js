import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://msdnrjegnbvqwrnfdwkq.supabase.co";
const supabaseKey = "sb_publishable_BPDzB7rC76CJ4yuNLhIMXQ_WHhDT-eE";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);