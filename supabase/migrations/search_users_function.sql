-- Función para buscar usuarios por nombre, apellido y email
-- Esta función realiza búsqueda en campos individuales y en la concatenación de todos
CREATE OR REPLACE FUNCTION search_users(
  search_term TEXT,
  excluded_user_id UUID DEFAULT NULL,
  page_number INT DEFAULT 1,
  page_size INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  avatar_url TEXT,
  total_count BIGINT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  offset_value INT;
BEGIN
  offset_value := (page_number - 1) * page_size;
  
  RETURN QUERY
  WITH filtered_users AS (
    SELECT 
      p.*,
      COUNT(*) OVER() as total_count
    FROM profile p
    WHERE 
      (excluded_user_id IS NULL OR p.id != excluded_user_id)
      AND (
        search_term IS NULL 
        OR search_term = '' 
        OR (
          -- Búsqueda en campos individuales
          p.first_name ILIKE '%' || search_term || '%'
          OR p.last_name ILIKE '%' || search_term || '%'
          OR p.email ILIKE '%' || search_term || '%'
          -- Búsqueda en concatenación de campos
          OR (COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
          -- Búsqueda invertida (apellido + nombre)
          OR (COALESCE(p.last_name, '') || ' ' || COALESCE(p.first_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
             -- Búsqueda invertida (nombre + apellido)
          OR (COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '') || ' ' || COALESCE(p.email, '')) 
             ILIKE '%' || search_term || '%'
        )
      )
    ORDER BY p.created_at DESC
    LIMIT page_size
    OFFSET offset_value
  )
  SELECT 
    fu.id,
    fu.first_name,
    fu.last_name,
    fu.email,
    fu.role,
    fu.created_at,
    fu.updated_at,
    fu.avatar_url,
    fu.total_count
  FROM filtered_users fu;
END;
$$;

-- Comentario de la función
COMMENT ON FUNCTION search_users IS 'Busca usuarios por nombre, apellido y email con soporte para términos múltiples y concatenación de campos';
