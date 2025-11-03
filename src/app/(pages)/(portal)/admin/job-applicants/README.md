# Playground - Kanban Board (React Query + Real Database)

Esta feature del Playground implementa un **sistema completo con React Query y base de datos real** siguiendo los patrones establecidos en el proyecto.

## 📁 Estructura de Archivos

```
playground/
├── page.jsx                          # Entry point - delega a la vista
├── _view/
│   └── playground-view.tsx          # UI principal - orquesta componentes
├── _hooks/
│   └── playground-hook.ts           # Lógica de negocio y estado local
├── _services/
│   └── playground-service.ts        # Mock data y helpers
└── _components/
    ├── board-view.tsx               # Vista de tablero Kanban
    ├── grid-view.tsx                # Vista de tabla
    ├── task-drawer.tsx              # Panel lateral de detalles
    ├── task-card.tsx                # Tarjeta de tarea
    ├── grid-row.tsx                 # Fila de tabla
    └── view-toggle.tsx              # Toggle entre vistas
```

---

## 🏗️ Arquitectura Simplificada

### 1. **SERVICE LAYER** (`_services/playground-service.ts`)

**Responsabilidad:** React Query hooks y llamadas a BD

**React Query Hooks:**

- ✅ `useJobApplicants(jobId)` - Consulta aplicantes por job con cache automático
- ✅ `useUpdateApplicantStatus()` - Mutación para cambiar status (drag & drop)
- ✅ `useUpdateApplicantSubStatus()` - Mutación para cambiar sub-status

**Helper Functions:**

- ✅ `transformJobSeekersToList()` - Transforma datos para vista grid
- ✅ `getColumnInfo()` - Helper para obtener info de columna
- ⚠️ `getMockApplicants()` - DEPRECATED - usar hooks

**Base de Datos:**

- ✅ Consulta tablas `job_applications` y `job_seeker`
- ✅ Actualiza status en BD con mutaciones
- ✅ Invalidación automática de cache

---

### 2. **HOOK LAYER** (`_hooks/playground-hook.ts`)

**Responsabilidad:** Lógica de negocio y orquestación de React Query

**Estado gestionado:**

- ✅ React Query state (jobSeekers, isLoading, error)
- ✅ Mutation state (isUpdatingStatus, updateError)
- ✅ View mode (board/grid)
- ✅ Drawer state (open/closed, selected applicant)
- ✅ Drag & Drop state

**Handlers:**

- ✅ `handleJobSeekerClick()` - Abre drawer con info de aplicante
- ✅ `closeDrawer()` - Cierra drawer
- ✅ `handleDragStart()` - Inicia drag
- ✅ `handleDragOver()` - Permite drop
- ✅ `handleDrop()` - **ACTUALIZA BD** y UI automáticamente
- ✅ `getAllJobSeekersWithStatus()` - Prepara datos para grid

**Características nuevas:**

- ✅ Integración completa con React Query
- ✅ Mutaciones que actualizan BD
- ✅ Estados de loading para operaciones async
- ✅ Manejo de errores de red

---

### 3. **VIEW LAYER** (`_view/playground-view.tsx` + `_components/`)

**Responsabilidad:** Presentación pura

**Componentes:**

#### `PlaygroundView` (Orquestador principal)

- Usa el hook `usePlaygroundHook()`
- Renderiza header con título y toggle
- Renderiza vista activa (Board o Grid)
- Renderiza drawer

#### `BoardView`

- Muestra columnas con drag & drop
- Renderiza cards arrastrables
- Maneja eventos de drag

#### `GridView`

- Tabla con 2 columnas (Content, Status)
- Filas clickeables
- Usa StatusBadge

#### `TaskDrawer`

- Panel lateral deslizante
- Muestra detalles de tarea
- Overlay con click para cerrar

#### `ViewToggle`

- Toggle entre Board y Grid
- Indicador visual de vista activa

#### `StatusBadge`

- Badge reutilizable con color dinámico
- Usado en Grid y Drawer

---

## 🔄 Flujo de Datos (Actualizado)

### Consulta de Datos:

```
COMPONENT MOUNT
    ↓
useJobApplicants(jobId) - REACT QUERY HOOK
    ↓
getJobApplicants(jobId) - SUPABASE QUERY
    ↓
CACHE + UI RE-RENDER
```

### Mutaciones (Drag & Drop):

```
USER DRAG & DROP
    ↓
handleDrop() - HOOK HANDLER
    ↓
useUpdateApplicantStatus.mutate() - REACT QUERY MUTATION
    ↓
SUPABASE UPDATE job_applications.status
    ↓
QUERY INVALIDATION + CACHE REFRESH
    ↓
UI RE-RENDER (automático)
```

---

## 🎯 Ventajas de esta Arquitectura

| Aspecto              | Beneficio                                    |
| -------------------- | -------------------------------------------- |
| **Separación clara** | Cada archivo tiene una responsabilidad única |
| **Reutilizable**     | Componentes y services independientes        |
| **Testeable**        | Cada capa se prueba por separado             |
| **Escalable**        | Fácil agregar nuevas features                |
| **Mantenible**       | Cambios aislados no rompen otras capas       |
| **Type-safe**        | TypeScript en toda la cadena                 |

---

## ✅ Estado Actual (Completado)

### ✅ **Backend Conectado**

- ✅ React Query implementado
- ✅ Mutations funcionando
- ✅ Drag & drop persiste en BD
- ✅ Estados de loading integrados

### ✅ **Funcionalidad Core**

- ✅ Drag & drop entre columnas
- ✅ Actualización automática en BD
- ✅ UI sincronizada con React Query
- ✅ Manejo de errores básico

## 🚀 Próximos Pasos (Opcionales)

### Fase 1: UX Mejorada

- [ ] Toast notifications para feedback
- [ ] Animaciones suaves en drag & drop
- [ ] Skeleton loaders

### Fase 2: Funcionalidad Avanzada

- [ ] Reordenar dentro de columnas
- [ ] Editar sub-status desde cards
- [ ] Filtros y búsqueda de aplicantes
- [ ] Bulk operations (mover múltiples)

---

## 📝 Ejemplo de Uso

```tsx
// page.jsx - Super simple
import PlaygroundView from "./_view/playground-view";

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
```

```tsx
// Para agregar una nueva columna:
// 1. Actualizar TASK_COLUMNS en playground-service.ts
// 2. Agregar datos iniciales en MOCK_TASKS
// 3. ¡Listo! El resto se actualiza automáticamente
```

---

## 🔧 Desarrollo

**Agregar nueva funcionalidad:**

1. ¿Es data fetching? → Agregar en `_services/`
2. ¿Es lógica de negocio? → Agregar en `_hooks/`
3. ¿Es UI? → Crear componente en `_components/`

**Modificar comportamiento:**

1. Service: Cambiar cómo se obtienen los datos
2. Hook: Cambiar la lógica de transformación
3. View: Cambiar cómo se visualiza

---

## ✨ **MEJORAS IMPLEMENTADAS (Noviembre 2024)**

### 🔄 **Migración a React Query**

- ✅ **Hooks consistentes**: Siguiendo patrones de `employers-page-service.ts` y `jobs-service.ts`
- ✅ **Query keys organizados**: `playgroundQueryKey = "playground"`
- ✅ **Cache automático**: No más `useEffect` manuales
- ✅ **Invalidaciones inteligentes**: Cache se actualiza automáticamente

### 🎯 **Drag & Drop Directo a BD**

- ✅ **Simplicidad total**: Arrastrar → BD se actualiza → UI se sincroniza
- ✅ **Sin validaciones innecesarias**: Directo y eficiente
- ✅ **Mutaciones limpias**: Código mínimo y mantenible
- ✅ **Estados de loading**: Indicador visual mientras actualiza
- ✅ **React Query**: Manejo automático de cache y sincronización
- ✅ **TypeScript**: Interfaces limpias y tipado seguro

### 📝 **Tipos TypeScript**

```typescript
interface JobApplicant {
  id: string;
  application_id: string;
  name: string;
  avatar_url: string | null;
  match_score: number;
  applied_date: string;
  sub_status: string;
  // ... más campos
}

interface GroupedApplicants {
  new_applicants: JobApplicant[];
  in_progress: JobApplicant[];
  matched_to_employer: JobApplicant[];
  complete: JobApplicant[];
}
```

### 🏗️ **Arquitectura Mejorada**

### 🔍 **Sistema de Validación y Debugging**

```typescript
// Validación de consistencia UI ↔ BD
const isConsistent = await validateConsistency();

// Refresh manual de datos
handleRefresh();

// Verificación post-mutación (automática en desarrollo)
// ✅ Status change verified in DB: { expected: "in_progress", actual: "in_progress" }
```

**Funciones de Debug disponibles:**

- 🔄 **Manual Refresh**: Refresca datos desde BD sin recargar página
- 🔍 **Validate Consistency**: Compara datos UI vs BD para detectar desincronización
- 📊 **Mutation Verification**: Confirma automáticamente que los cambios se aplicaron
- 📝 **Detailed Logging**: Logs completos de todas las operaciones para debugging

### 🏗️ **Arquitectura Mejorada**

| Antes                    | Después                           |
| ------------------------ | --------------------------------- |
| `useState` + `useEffect` | React Query hooks                 |
| Mock data estático       | BD real con Supabase              |
| Cambios solo en UI       | ✅ **Persistencia en BD**         |
| Manejo manual de loading | Estados automáticos               |
| Sin validación           | ✅ **Validación de consistencia** |
| Errores silenciosos      | ✅ **Logging detallado**          |
| Sin verificación         | ✅ **Confirmación post-cambio**   |
| Código repetitivo        | Reutilización de patrones         |

---

## 🧪 **Cómo Verificar que los Cambios se Guardan en BD**

### **Método 1: Logs en Consola**

1. Abrir DevTools → Console
2. Hacer drag & drop de un aplicante
3. Ver logs de confirmación:

```
🔄 Starting drag & drop operation: { applicant: "John Doe", fromColumn: "new_applicants", toColumn: "in_progress" }
✅ Database updated successfully: { status: "in_progress", updated_at: "2024-11-02T..." }
✅ Status change verified in DB: { expected: "in_progress", actual: "in_progress" }
```

### **Método 2: Botones de Debug** (solo en desarrollo)

1. Click en "🔍 Validate" → Compara UI vs BD
2. Click en "🔄 Refresh" → Recarga desde BD
3. Si los datos siguen igual después del refresh = ✅ **guardado correctamente**

### **Método 3: Verificación Directa en BD**

```sql
-- Query para verificar en Supabase
SELECT id, status, sub_status, updated_at
FROM job_applications
WHERE job_id = 'tu-job-id'
ORDER BY updated_at DESC;
```

### **Método 4: Recarga de Página**

1. Hacer drag & drop
2. Recargar página (F5)
3. Si el aplicante sigue en la nueva posición = ✅ **persistido correctamente**

---

**Arquitectura inspirada en:** Jobs View Pattern (`/admin/jobs/view/`) + Employers Pattern (`/admin/employers/`)
