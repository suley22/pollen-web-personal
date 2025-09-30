"use server";

import { createClient } from "@/utils/supabase/server";


export async function getEmployerProfile(filters = {}) {
  try {
    console.log('Fetching employer profiles with filters:', filters);

    const supabase = await createClient();

    let query = supabase
      .from('employer_profile')
      .select('*')
      .order('created_at', { ascending: false })

    // Aplicar filtro por approval_status si existe (tu DB tiene approval_status, no status)
    if (filters.status && filters.status !== 'all') {
      query = query.eq('approval_status', filters.status)
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `company_name.ilike.%${filters.searchTerm}%,company_location.ilike.%${filters.searchTerm}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data }

  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Failed to fetch applications' }
  }
}
