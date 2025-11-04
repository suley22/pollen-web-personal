"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getLoggedInUserId } from "@/services/userService";

const supabase = createClient();

export interface CreateAssessmentResponseInput {
  assessmentData: any; // Assessment original
  userAnswers: Record<string, any>; // Respuestas del usuario por question ID
}

export interface AssessmentResponseResult {
  id: string;
  created_at: string;
}

/**
 * Hook para crear un assessment response
 * Clona el assessment original y agrega las respuestas del usuario
 */
export function useCreateAssessmentResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      assessmentData,
      userAnswers,
    }: CreateAssessmentResponseInput): Promise<AssessmentResponseResult> => {
      const userId = await getLoggedInUserId();

      // Clonar el assessment original y agregar respuestas
      const questionsWithAnswers = assessmentData.questions.map(
        (question: any) => {
          const questionWithAnswer = { ...question };

          // Agregar respuesta del usuario si existe
          if (userAnswers[question.id]) {
            questionWithAnswer.user_answer = userAnswers[question.id];
            questionWithAnswer.answered_at = new Date().toISOString();
          }

          return questionWithAnswer;
        },
      );

      // Crear el assessment response
      const { data, error } = await supabase
        .from("assessments_response")
        .insert({
          internal_pollen_title: assessmentData.internal_pollen_title,
          title: assessmentData.title,
          subtitle: assessmentData.subtitle,
          type: assessmentData.type,
          status: "live", // Status cuando es completado por candidato
          estimated_duration: assessmentData.estimated_duration,
          instructions_title: assessmentData.instructions_title,
          instructions_description: assessmentData.instructions_description,
          questions: questionsWithAnswers,
          categories: assessmentData.categories || [],
          questions_count: questionsWithAnswers.length,
          total_submissions: 1, // Primera submission del candidato
          user_id: userId,
          updated_by: userId,
        })
        .select("id, created_at")
        .single();

      if (error) {
        console.error("Error creating assessment response:", error);
        throw new Error(
          error.message || "Failed to create assessment response",
        );
      }

      return data;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas si es necesario
      queryClient.invalidateQueries({ queryKey: ["assessment-responses"] });
    },
    onError: (error) => {
      console.error("Error in assessment response mutation:", error);
    },
  });
}

/**
 * Función helper para preparar las respuestas del usuario
 */
export function prepareUserAnswers(
  multipleChoiceAnswers: Record<string, string>,
  freeInputAnswers: string[],
  fileUploadAnswers: Record<number, any>,
  questions: any[],
): Record<string, any> {
  const userAnswers: Record<string, any> = {};

  questions.forEach((question, index) => {
    const questionId = question.id;

    if (question.type === "multiple_choice") {
      // Para multiple choice, guardar el valor seleccionado
      if (multipleChoiceAnswers[questionId]) {
        userAnswers[questionId] = {
          type: "multiple_choice",
          selected_value: multipleChoiceAnswers[questionId],
        };
      }
    } else if (question.type === "free_input") {
      // Para free input, guardar el texto
      if (freeInputAnswers[index]) {
        userAnswers[questionId] = {
          type: "free_input",
          text_response: freeInputAnswers[index],
        };
      }
    } else if (question.type === "file_upload") {
      // Para file upload, guardar información del archivo
      if (fileUploadAnswers[index]) {
        userAnswers[questionId] = {
          type: "file_upload",
          uploaded_file: fileUploadAnswers[index],
        };
      }
    }
  });

  return userAnswers;
}

/**
 * Hook para obtener un assessment response por ID
 * Útil para mostrar las respuestas de un candidato en el admin
 */
export function useAssessmentResponse(assessmentResponseId: string | null) {
  return useQuery({
    queryKey: ["assessment-response", assessmentResponseId],
    queryFn: async () => {
      if (!assessmentResponseId) {
        throw new Error("Assessment response ID is required");
      }

      const { data, error } = await supabase
        .from("assessments_response")
        .select("*")
        .eq("id", assessmentResponseId)
        .single();

      if (error) {
        console.error("❌ Error fetching assessment response:", error);
        throw new Error(
          `Failed to fetch assessment response: ${error.message}`,
        );
      }

      return data;
    },
    enabled: !!assessmentResponseId,
  });
}
