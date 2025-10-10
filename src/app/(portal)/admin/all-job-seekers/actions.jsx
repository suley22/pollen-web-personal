"use server";

import { createClient } from "@/utils/supabase/server";


export async function getJobSeeker(filters = {}) {
  try {
    console.log('Fetching job seekers with filters:', filters);

    const supabase = await createClient();

    let query = supabase
      .from('job_seeker')
      .select('*')
      .order('created_at', { ascending: false })

    // Aplicar filtro por approval_status si existe (tu DB tiene approval_status, no status)
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    // Aplicar filtro de búsqueda si existe
    if (filters.searchTerm) {
      query = query.or(
        `name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`
      )
    }

    if (filters.profile && filters.profile !== 'all') {
      query = query.eq('profile_complete', filters.profile)
    }

    // Aplicar filtro de aplicaciones si existe
    if (filters.application && filters.application !== 'all') {
      if (filters.application === 'has_applied') {
        query = query.gt('total_applications', 0)
      } else if (filters.application === 'not_applied') {
        query = query.eq('total_applications', 0)
      }
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching job seekers:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data }

  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'Failed to fetch job seekers' }
  }
}
