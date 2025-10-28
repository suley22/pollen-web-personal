# StatisticsCards Component

A reusable design system component for displaying statistics cards with filtering functionality.

## Features

- **Responsive Grid**: Customizable grid layout for different screen sizes
- **Loading States**: Built-in skeleton loading support
- **Click to Filter**: Click on any card to filter by that category
- **Visual Feedback**: Hover effects and ring highlighting for selected cards
- **Fully Typed**: TypeScript support with proper types

## Usage

```tsx
import { StatisticsCards, StatisticCard } from "@/components/design-system";
import { FileText, FilePen, Play } from "lucide-react";

function MyPage() {
  const [selectedId, setSelectedId] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const cards: StatisticCard[] = [
    {
      id: "all",
      label: "Total Items",
      count: 100,
      icon: FileText,
      color: "text-foreground",
      ringColor: "ring-primary",
    },
    {
      id: "draft",
      label: "Draft",
      count: 25,
      icon: FilePen,
      color: "text-yellow-600",
      ringColor: "ring-yellow-500",
    },
    {
      id: "live",
      label: "Live",
      count: 75,
      icon: Play,
      color: "text-green-600",
      ringColor: "ring-green-500",
    },
  ];

  return (
    <StatisticsCards
      cards={cards}
      selectedId={selectedId}
      onCardClick={setSelectedId}
      isLoading={isLoading}
      gridCols={{
        base: "grid-cols-1",
        md: "md:grid-cols-3",
      }}
    />
  );
}
```

## Props

### StatisticsCards

| Prop          | Type                   | Default   | Description                     |
| ------------- | ---------------------- | --------- | ------------------------------- |
| `cards`       | `StatisticCard[]`      | Required  | Array of card configurations    |
| `selectedId`  | `string`               | Required  | Currently selected card ID      |
| `onCardClick` | `(id: string) => void` | Required  | Callback when a card is clicked |
| `isLoading`   | `boolean`              | `false`   | Show loading skeleton           |
| `gridCols`    | `GridCols`             | See below | Grid layout configuration       |

### StatisticCard

| Property    | Type         | Required | Description                                                 |
| ----------- | ------------ | -------- | ----------------------------------------------------------- |
| `id`        | `string`     | Yes      | Unique identifier for the card                              |
| `label`     | `string`     | Yes      | Display label                                               |
| `count`     | `number`     | Yes      | Number to display                                           |
| `icon`      | `LucideIcon` | Yes      | Icon component from lucide-react                            |
| `color`     | `string`     | Yes      | Tailwind color class (e.g., "text-yellow-600")              |
| `ringColor` | `string`     | Yes      | Tailwind ring color for selection (e.g., "ring-yellow-500") |

### GridCols

```typescript
{
  base?: string;  // Default: "grid-cols-1"
  md?: string;    // Default: "md:grid-cols-4"
  lg?: string;    // Default: undefined
}
```

## Examples

### 4-Column Layout (Employers)

```tsx
const cards = [
  {
    id: "all",
    label: "Total Companies",
    count: 150,
    icon: Building2,
    color: "text-foreground",
    ringColor: "ring-primary",
  },
  {
    id: "draft",
    label: "Draft",
    count: 30,
    icon: FileText,
    color: "text-yellow-600",
    ringColor: "ring-yellow-500",
  },
  {
    id: "live",
    label: "Live",
    count: 100,
    icon: Eye,
    color: "text-green-600",
    ringColor: "ring-green-500",
  },
  {
    id: "hidden",
    label: "Hidden",
    count: 20,
    icon: EyeOff,
    color: "text-gray-600",
    ringColor: "ring-gray-500",
  },
];

<StatisticsCards
  cards={cards}
  selectedId={selectedStatus}
  onCardClick={setSelectedStatus}
  isLoading={loading}
  gridCols={{ base: "grid-cols-1", md: "md:grid-cols-4" }}
/>;
```

### 5-Column Layout (Assessments)

```tsx
const cards = [
  {
    id: "all",
    label: "Total Assessments",
    count: 50,
    icon: FileText,
    color: "text-foreground",
    ringColor: "ring-primary",
  },
  {
    id: "draft",
    label: "Draft",
    count: 10,
    icon: FilePen,
    color: "text-yellow-600",
    ringColor: "ring-yellow-500",
  },
  {
    id: "live",
    label: "Live",
    count: 30,
    icon: Play,
    color: "text-green-600",
    ringColor: "ring-green-500",
  },
  {
    id: "paused",
    label: "Paused",
    count: 5,
    icon: Pause,
    color: "text-orange-600",
    ringColor: "ring-orange-500",
  },
  {
    id: "archived",
    label: "Archived",
    count: 5,
    icon: Archive,
    color: "text-gray-600",
    ringColor: "ring-gray-500",
  },
];

<StatisticsCards
  cards={cards}
  selectedId={selectedStatus}
  onCardClick={onStatusChange}
  isLoading={isLoading}
  gridCols={{ base: "grid-cols-1", md: "md:grid-cols-5" }}
/>;
```

## Color Palette

Common color combinations:

- **Total/All**: `text-foreground` + `ring-primary`
- **Draft**: `text-yellow-600` + `ring-yellow-500`
- **Live**: `text-green-600` + `ring-green-500`
- **Paused**: `text-orange-600` + `ring-orange-500`
- **Hidden/Archived**: `text-gray-600` + `ring-gray-500`
- **Error/Deleted**: `text-red-600` + `ring-red-500`

## Skeleton Loading

When `isLoading={true}`, the component automatically displays skeleton placeholders matching the number of cards provided.
