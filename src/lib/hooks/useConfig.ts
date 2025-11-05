'use server'

import { createClient } from '@/utils/supabase/server'

export async function getAppConfig(keys: string | string[]) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('No autenticado')
  }

  // Normalizar a array
  const keysArray = Array.isArray(keys) ? keys : [keys]

  // Una sola query para múltiples keys
  const { data, error } = await supabase
    .from('app_config')
    .select('key, value')
    .in('key', keysArray)

  if (error) throw error

  // Retornar como objeto key-value para fácil acceso
  return data.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, string>)
}