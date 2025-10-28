// lib/supabase-admin.js
import { createClient } from '@supabase/supabase-js'

// Validar que las variables de entorno existan
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Not Found');
console.log('Supabase Service Role Key:', supabaseServiceRoleKey ? 'Found' : 'Not Found');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Faltan las variables de entorno de Supabase Admin')
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)