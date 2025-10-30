# Playground - Kanban Board (UI Pura + Mock Data)

Esta feature del Playground está simplificada con **UI pura y datos mockeados** para desarrollo y testing.

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

**Responsabilidad:** Datos mockeados y helpers

- ✅ `MOCK_TASKS` - Datos estáticos de ejemplo
- ✅ `TASK_COLUMNS` - Definición de columnas del Kanban
- ✅ `getMockApplicants()` - Retorna datos mockeados
- ✅ `transformTasksToList()` - Transforma datos para vista grid
- ✅ `getColumnInfo()` - Helper para obtener info de columna

**Nota:** No hay llamadas a BD, todo es estado local

---

### 2. **HOOK LAYER** (`_hooks/playground-hook.ts`)

**Responsabilidad:** Lógica de negocio y estado local

**Estado gestionado:**

- Tasks state (useState con datos mockeados)
- View mode (board/grid)
- Drawer state (open/closed, selected task)
- Drag & Drop state

**Handlers:**

- `handleTaskClick()` - Abre drawer con info de tarea
- `closeDrawer()` - Cierra drawer
- `handleDragStart()` - Inicia drag
- `handleDragOver()` - Permite drop
- `handleDrop()` - Completa el movimiento de tarea
- `getAllTasksWithStatus()` - Prepara datos para grid

**Retorna:** Todo lo que la UI necesita (datos + handlers + estado)

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

## 🔄 Flujo de Datos

```
USER ACTION
    ↓
COMPONENT (BoardView, GridView)
    ↓
HANDLER del HOOK (handleTaskClick, handleDrop)
    ↓
SERVICE (useMoveTask, useTasks)
    ↓
STATE UPDATE (setTasks)
    ↓
UI RE-RENDER
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

## 🚀 Próximos Pasos

### Fase 1: Conectar con Backend

- [ ] Reemplazar mock data con Supabase
- [ ] Implementar React Query en el service
- [ ] Agregar mutations para mover tareas
- [ ] Manejo de errores y loading states

### Fase 2: Mejorar UI

- [ ] Animaciones en drag & drop
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Filtros y búsqueda

### Fase 3: Funcionalidad Avanzada

- [ ] Crear nuevas tareas
- [ ] Editar tareas inline
- [ ] Eliminar tareas
- [ ] Reordenar dentro de columnas
- [ ] Asignación de usuarios
- [ ] Fechas y prioridades

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

**Arquitectura inspirada en:** Jobs View Pattern (`/admin/jobs/view/`)
