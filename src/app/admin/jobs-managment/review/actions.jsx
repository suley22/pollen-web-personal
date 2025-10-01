"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchJobProfile(id) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('job')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return { error: error.message, data: null };
    } else {
        return { error: null, data };
    }
}
