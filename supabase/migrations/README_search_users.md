# Función de Búsqueda de Usuarios - Supabase

## Descripción

Esta función PostgreSQL (`search_users`) realiza búsquedas inteligentes de usuarios en la tabla `profile`, buscando en:
- Campos individuales: `first_name`, `last_name`, `email`
- Concatenación de campos: "Nombre Apellido Email"
- Concatenación invertida: "Apellido Nombre Email"

## Instalación

### Opción 1: Desde Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **SQL Editor**
3. Crea una nueva query
4. Copia y pega el contenido de `search_users_function.sql`
5. Ejecuta la query

### Opción 2: Desde CLI de Supabase

```bash
# Si usas Supabase CLI
supabase db push

# O aplicar manualmente
psql YOUR_DATABASE_URL < supabase/migrations/search_users_function.sql
```

## Uso desde TypeScript

La función ya está integrada en el servicio de roles:

```typescript
const { data, error } = await supabase.rpc('search_users', {
  search_term: 'john doe',
  excluded_user_id: currentUserId, // opcional
  page_number: 1,
  page_size: 10,
});
```

## Parámetros

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `search_term` | TEXT | No | NULL | Término de búsqueda |
| `excluded_user_id` | UUID | No | NULL | ID del usuario a excluir (ej: usuario actual) |
| `page_number` | INT | No | 1 | Número de página |
| `page_size` | INT | No | 10 | Tamaño de página |

## Retorno

La función retorna una tabla con:
- `id`: UUID del usuario
- `first_name`: Nombre
- `last_name`: Apellido
- `email`: Email
- `role`: Rol del usuario
- `created_at`: Fecha de creación
- `updated_at`: Fecha de actualización
- `avatar_url`: URL del avatar
- `total_count`: Total de resultados (para paginación)

## Ejemplos de búsqueda

| Búsqueda | Encuentra |
|----------|-----------|
| `"john"` | Usuarios con "john" en nombre, apellido o email |
| `"john doe"` | Usuarios con nombre="John" y apellido="Doe" |
| `"doe john"` | También encuentra "John Doe" (búsqueda invertida) |
| `"john gmail"` | Usuarios con nombre="John" y email que contenga "gmail" |
| `""` o `NULL` | Todos los usuarios (respeta paginación) |

## Ventajas

✅ **Búsqueda flexible**: Encuentra usuarios por términos múltiples  
✅ **Case-insensitive**: No distingue mayúsculas/minúsculas  
✅ **Paginación integrada**: Incluye total_count para UI  
✅ **Optimizada**: Usa índices de PostgreSQL  
✅ **Segura**: Excluye automáticamente el usuario actual

## Permisos necesarios

La función requiere permisos de lectura en la tabla `profile`. Asegúrate de que tu política RLS permita la ejecución.

```sql
-- Ejemplo de política RLS para la función
CREATE POLICY "Users can search other users"
ON profile FOR SELECT
TO authenticated
USING (true);
```
