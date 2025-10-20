# DynamicListInput Component

A reusable component for managing a list of items with configurable fields. Perfect for adding dynamic lists like social media links, contact persons, addresses, etc.

## Features

- ✅ Configurable fields (any number of string fields)
- ✅ Automatic validation
- ✅ Add/Remove items
- ✅ Enter key support
- ✅ Custom item rendering
- ✅ JSON serialization for form submission
- ✅ Initial items support

## Basic Usage

### Social Media Links

```jsx
import { DynamicListInput } from "@/components/design-system";
import { Share2 } from "lucide-react";

<DynamicListInput
  title="Social Media"
  icon={<Share2 className="h-5 w-5" />}
  name="social_medias"
  addButtonText="Add Social Media"
  fields={[
    {
      key: "platform",
      label: "Platform",
      placeholder: "e.g., LinkedIn, Twitter, Instagram...",
      type: "text",
      required: true,
    },
    {
      key: "url",
      label: "URL",
      placeholder: "https://...",
      type: "url",
      required: true,
    },
  ]}
  initialItems={[
    { platform: "LinkedIn", url: "https://linkedin.com/company/example" },
  ]}
/>;
```

## Other Use Cases

### Contact Persons

```jsx
import { Users } from "lucide-react";

<DynamicListInput
  title="Contact Persons"
  icon={<Users className="h-5 w-5" />}
  name="contacts"
  addButtonText="Add Contact"
  fields={[
    {
      key: "name",
      label: "Full Name",
      placeholder: "John Doe",
      type: "text",
      required: true,
    },
    {
      key: "role",
      label: "Role",
      placeholder: "HR Manager",
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email",
      placeholder: "john@example.com",
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone",
      placeholder: "+1 234 567 890",
      type: "tel",
      required: false,
    },
  ]}
/>;
```

### Office Locations

```jsx
import { MapPin } from "lucide-react";

<DynamicListInput
  title="Office Locations"
  icon={<MapPin className="h-5 w-5" />}
  name="locations"
  addButtonText="Add Location"
  fields={[
    {
      key: "city",
      label: "City",
      placeholder: "New York",
      type: "text",
    },
    {
      key: "address",
      label: "Address",
      placeholder: "123 Main St",
      type: "text",
    },
    {
      key: "country",
      label: "Country",
      placeholder: "USA",
      type: "text",
    },
  ]}
/>;
```

### Certifications / Awards

```jsx
import { Award } from "lucide-react";

<DynamicListInput
  title="Certifications"
  icon={<Award className="h-5 w-5" />}
  name="certifications"
  addButtonText="Add Certification"
  fields={[
    {
      key: "name",
      label: "Certification Name",
      placeholder: "ISO 9001",
      type: "text",
    },
    {
      key: "year",
      label: "Year",
      placeholder: "2024",
      type: "text",
    },
    {
      key: "issuer",
      label: "Issued By",
      placeholder: "International Organization",
      type: "text",
    },
  ]}
/>;
```

### Key Team Members

```jsx
import { Users } from "lucide-react";

<DynamicListInput
  title="Key Team Members"
  icon={<Users className="h-5 w-5" />}
  name="team_members"
  addButtonText="Add Team Member"
  fields={[
    {
      key: "name",
      label: "Name",
      placeholder: "Jane Smith",
      type: "text",
    },
    {
      key: "position",
      label: "Position",
      placeholder: "CTO",
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      placeholder: "https://linkedin.com/in/...",
      type: "url",
    },
  ]}
/>;
```

## Props

| Prop            | Type               | Required | Default    | Description                                 |
| --------------- | ------------------ | -------- | ---------- | ------------------------------------------- |
| `title`         | string             | Yes      | -          | Card title                                  |
| `icon`          | ReactNode          | Yes      | -          | Icon for the card header                    |
| `name`          | string             | Yes      | -          | Name for the hidden input (form submission) |
| `fields`        | Array<FieldConfig> | Yes      | []         | Configuration for input fields              |
| `initialItems`  | Array<Object>      | No       | []         | Initial list of items                       |
| `addButtonText` | string             | No       | "Add Item" | Text for the add button                     |
| `renderItem`    | Function           | No       | -          | Custom render function for list items       |

### FieldConfig

```typescript
{
  key: string;           // Unique key for the field
  label: string;         // Label text
  placeholder?: string;  // Placeholder text
  type?: string;         // Input type (text, email, url, tel, etc.)
  required?: boolean;    // Whether field is required
}
```

## Custom Rendering

You can provide a custom render function for list items:

```jsx
<DynamicListInput
  title="Custom Items"
  icon={<Icon />}
  name="items"
  fields={[...]}
  renderItem={(item) => (
    <div className="flex items-center gap-2">
      <img src={item.avatar} className="w-8 h-8 rounded-full" />
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-500">{item.email}</p>
      </div>
    </div>
  )}
/>
```

## Form Submission

The component automatically creates a hidden input with the `name` prop that contains a JSON stringified array of all items. This can be parsed on the server:

```javascript
// Server action
const formData = new FormData(form);
const socialMedias = JSON.parse(formData.get("social_medias"));
// socialMedias = [{ platform: "LinkedIn", url: "..." }, ...]
```

## Benefits

- **Reusable**: One component for all dynamic list scenarios
- **Configurable**: Easy to customize for different use cases
- **Consistent**: Maintains design system consistency
- **Type-safe**: All values are strings (as specified)
- **Validation**: Built-in validation (all fields must be filled)
- **User-friendly**: Enter key support, clear visual feedback
