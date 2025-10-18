// ============================================
// 📦 SHARED COMPONENTS & UTILITIES
// ============================================

// Re-export de componentes del design system
export {
  FormCard,
  PageContainer,
  PageHeader,
  FormContainer,
  FormActions,
  ConfirmationDialog,
  Input,
  Textarea,
  TextAreaCard,
  DynamicListInput,
  Select,
  InfoField,
} from "@/components/design-system";

// Re-export de componentes UI
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export { Badge } from "@/components/ui/badge";
export { Button } from "@/components/ui/button";
export { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export { Label } from "@/components/ui/label";

// Re-export de iconos
export {
  Target,
  FileText,
  Lightbulb,
  Award,
  UserCheck,
  Briefcase,
  Brain,
  CheckCircle,
  Eye,
  Users,
  Info,
} from "lucide-react";

// Re-export de constantes
export {
  WORK_ARRANGEMENT_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  WORK_AUTHORIZATION_OPTIONS,
  ASSESSMENT_PLACEHOLDER_CONSTANT,
  ASSESSMENT_SCORING_PLACEHOLDER,
  WORKING_HOURS_OPTIONS,
} from "@/lib/configs/constants/jobs-constants";

// Componentes específicos
export { CompanySearchSelect } from "../create/CompanySearchSelect";
