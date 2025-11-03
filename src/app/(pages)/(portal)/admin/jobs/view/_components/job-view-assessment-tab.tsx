import { FormCard } from "@/components/design-system";
import { Brain } from "lucide-react";
import { JobAssessmentSkeleton } from "./job-view-skeletons";
import { useAssessmentById } from "@/assessments/_services/assessments-page-service";
import { AssessmentCreateUnifiedPreview } from "@/app/(pages)/(portal)/admin/assessments/create/_components/assessment-create-unified-preview";

export function JobAssessmentTab({ job = null, isLoading = false }) {
  // Cargar assessment asociado al job
  const { data: assessment, isLoading: isLoadingAssessment } =
    useAssessmentById(job?.skills_assessment_id || "");

  if (isLoading) {
    return <JobAssessmentSkeleton />;
  }

  // Convertir preguntas para preview (mismo patrón que otros componentes)
  const convertQuestionsForPreview = (assessment) => {
    if (!assessment?.questions) return [];

    return assessment.questions.map((q, index) => {
      const baseQuestion: any = {
        id: q.id || `question-${index}`,
        type: q.type,
        title: q.title,
        description: q.subtitle || "",
      };

      if (q.type === "multiple_choice" && q.multiple_choice) {
        baseQuestion.options_title = q.multiple_choice.options_title || "";
        baseQuestion.options = q.multiple_choice.options || [];
        baseQuestion.categoryId = q.multiple_choice.categoryId;
      } else if (q.type === "free_input" && q.free_input) {
        baseQuestion.max_characters = q.free_input.placeholder || "";
      } else if (q.type === "file_upload") {
        baseQuestion.file_upload = {
          referenceFiles: q.file_upload?.referenceFiles || [],
        };
      }

      return baseQuestion;
    });
  };

  // Si no hay assessment asignado, mostrar mensaje
  if (!job?.skills_assessment_id) {
    return (
      <FormCard title="Skills Assessment" icon={<Brain className="h-5 w-5" />}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No skills assessment assigned for candidate evaluation.
          </p>
        </div>
      </FormCard>
    );
  }

  // Si está cargando el assessment
  if (isLoadingAssessment) {
    return (
      <FormCard title="Skills Assessment" icon={<Brain className="h-5 w-5" />}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading skills assessment...</p>
        </div>
      </FormCard>
    );
  }

  // Si no se encontró el assessment
  if (!assessment) {
    return (
      <FormCard title="Skills Assessment" icon={<Brain className="h-5 w-5" />}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Skills assessment not found.</p>
        </div>
      </FormCard>
    );
  }

  // Mostrar preview completa del assessment
  return (
    <FormCard title="Skills Assessment" icon={<Brain className="h-5 w-5" />}>
      <div className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-700 font-medium">
            Skills assessment assigned for candidate evaluation
          </p>
          <p className="text-sm text-purple-600 mt-1">
            <strong>
              {assessment.internal_pollen_title || assessment.title}
            </strong>
          </p>
        </div>

        <div className="border rounded-lg p-6 bg-background">
          <AssessmentCreateUnifiedPreview
            assessmentTitle={assessment.title || ""}
            assessmentDescription={assessment.subtitle || ""}
            instructionsTitle={assessment.instructions_title || ""}
            instructionsDescription={assessment.instructions_description || ""}
            questions={convertQuestionsForPreview(assessment)}
            categories={assessment.categories || []}
            isEditMode={false}
          />
        </div>
      </div>
    </FormCard>
  );
}
