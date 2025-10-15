# CheckboxGroup Component

Componente de selección múltiple con checkboxes que permite:

- Seleccionar múltiples opciones de una lista predefinida
- Agregar opciones personalizadas dinámicamente
- Guardar los **labels** (no los values) en la base de datos
- Controlar la selección externamente

## Uso Básico

```jsx
import { CheckboxGroup } from "@/components/design-system";

function MyForm() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <CheckboxGroup
      items={["Option 1", "Option 2", "Option 3"]}
      name="my-field"
      initialSelectedItems={[]}
      onChange={setSelectedItems}
    />
  );
}
```

## Props

| Prop                     | Tipo                                  | Default                | Descripción                                   |
| ------------------------ | ------------------------------------- | ---------------------- | --------------------------------------------- |
| `items`                  | `string[]` o `Array<{label: string}>` | `[]`                   | Lista de opciones predefinidas                |
| `name`                   | `string`                              | `"checkbox-group"`     | Nombre del campo para el formulario           |
| `initialSelectedItems`   | `string[]`                            | `[]`                   | Items seleccionados inicialmente (labels)     |
| `onChange`               | `(items: string[]) => void`           | -                      | Callback cuando cambia la selección           |
| `allowCustomItems`       | `boolean`                             | `false`                | Permitir agregar items personalizados         |
| `customItemsPlaceholder` | `string`                              | `"Add custom item..."` | Placeholder del input de items personalizados |
| `columns`                | `number`                              | `3`                    | Número de columnas en el grid                 |
| `className`              | `string`                              | -                      | Clases CSS adicionales                        |

## Ejemplo con Items Personalizados

```jsx
<CheckboxGroup
  items={["Technology", "Healthcare", "Finance"]}
  name="industries"
  allowCustomItems={true}
  customItemsPlaceholder="Add your industry and press Enter"
  onChange={(selected) => console.log("Selected:", selected)}
/>
```

## Ejemplo con Objetos

```jsx
<CheckboxGroup
  items={[
    { label: "Technology" },
    { label: "Healthcare" },
    { label: "Finance" },
  ]}
  name="industries"
  columns={2}
/>
```

## Características

### 1. Guarda Labels, no Values

A diferencia de otros componentes, este guarda los labels directamente:

```javascript
// Base de datos:
industries: ["Technology", "Healthcare", "Custom Industry"];
```

### 2. Items Personalizados

Los usuarios pueden agregar sus propios items:

- Escribir en el input
- Presionar Enter para agregar
- **El item se agrega automáticamente seleccionado**
- **No se puede desmarcar con el checkbox (aparece deshabilitado)**
- **Solo se puede eliminar con el botón X**
- Al eliminar, se remueve de la lista y de la selección

### 3. Hidden Inputs

Genera automáticamente hidden inputs para compatibilidad con formularios HTML tradicionales:

```html
<input type="hidden" name="industries" value="Technology" />
<input type="hidden" name="industries" value="Healthcare" />
```

### 4. Estado Controlado

El componente mantiene su propio estado pero notifica cambios al padre vía `onChange`.

## Uso con Formularios

```jsx
function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const industries = formData.getAll("industries");
    console.log(industries); // ["Technology", "Healthcare", ...]
  };

  return (
    <form onSubmit={handleSubmit}>
      <CheckboxGroup
        items={["Option 1", "Option 2"]}
        name="industries"
        allowCustomItems={true}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Estilo y Personalización

El componente usa Tailwind CSS y sigue el design system. Puedes personalizar:

```jsx
<CheckboxGroup
  items={items}
  columns={4} // Cambiar número de columnas
  className="my-custom-class" // Agregar clases personalizadas
/>
```

## Ejemplo Completo: Industrias

```jsx
import { CheckboxGroup } from "@/components/design-system";
import { INDUSTRY_OPTIONS } from "@/lib/configs/constants/industries";

function CompanyForm() {
  const [selectedIndustries, setSelectedIndustries] = useState([
    "Technology",
    "Healthcare",
  ]);

  return (
    <div>
      <label>Select Industries</label>
      <CheckboxGroup
        items={INDUSTRY_OPTIONS}
        name="industries"
        initialSelectedItems={selectedIndustries}
        onChange={setSelectedIndustries}
        allowCustomItems={true}
        customItemsPlaceholder="Add your industry and press Enter"
        columns={3}
      />
      <p>Selected: {selectedIndustries.join(", ")}</p>
    </div>
  );
}
```
