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
        (question: any, index: number) => {
          // Usar el mismo sistema de IDs que usa el estado (question-index)
          const questionId = question.id || `question-${index}`;

          const questionWithAnswer = { ...question };

          // Buscar respuesta usando el ID consistente
          if (userAnswers[questionId]) {
            questionWithAnswer.user_answer = userAnswers[questionId];
            questionWithAnswer.answered_at = new Date().toISOString();
          }

          return questionWithAnswer;
        },
      );

      // Calcular resultados por categorías para guardar con la respuesta
      const multipleChoiceAnswers: Record<string, string> = {};
      Object.entries(userAnswers).forEach(([questionId, answer]) => {
        if (answer.type === "multiple_choice") {
          multipleChoiceAnswers[questionId] = answer.selected_value;
        }
      });

      const categoryResults = calculateCategoryResults(
        multipleChoiceAnswers,
        assessmentData.questions,
        assessmentData.categories || [],
      );

      // Agregar los resultados al final del array de preguntas
      const questionsWithResults = [
        ...questionsWithAnswers,
        {
          type: "assessment_results",
          category_results: categoryResults,
          calculated_at: new Date().toISOString(),
        },
      ];

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
          questions: questionsWithResults,
          categories: assessmentData.categories || [],
          questions_count: questionsWithAnswers.length, // Sin contar los resultados
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
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas para actualizar UI inmediatamente
      queryClient.invalidateQueries({ queryKey: ["assessment-responses"] });
      queryClient.invalidateQueries({
        queryKey: ["assessment-response", data.id],
      });

      // También invalidar job applicants para que el admin drawer se actualice
      queryClient.invalidateQueries({ queryKey: ["job-applicants"] });

      console.log(
        "✅ Assessment response created successfully, cache invalidated",
      );
    },
    onError: (error) => {
      console.error("Error in assessment response mutation:", error);
    },
  });
}

/**
 * Función helper para calcular los resultados por categorías
 */
function calculateCategoryResults(
  multipleChoiceAnswers: Record<string, string>,
  questions: any[],
  categories: any[],
): any[] {
  const categoryCounts = new Map<string, number>();
  let totalAnswered = 0;

  Object.entries(multipleChoiceAnswers).forEach(([questionId, optionValue]) => {
    const questionIndex = parseInt(questionId.split("-")[1]);
    const question = questions[questionIndex];

    if (
      question?.type === "multiple_choice" &&
      question.multiple_choice?.options
    ) {
      const selectedOption = question.multiple_choice.options.find(
        (opt: any) => opt.value === optionValue,
      );
      if (selectedOption?.categoryId) {
        categoryCounts.set(
          selectedOption.categoryId,
          (categoryCounts.get(selectedOption.categoryId) || 0) + 1,
        );
        totalAnswered++;
      }
    }
  });

  return (categories || [])
    .map((category) => {
      const count = categoryCounts.get(category.id) || 0;
      const percentage =
        totalAnswered > 0 ? Math.round((count / totalAnswered) * 100) : 0;
      return {
        ...category,
        count,
        percentage,
      };
    })
    .filter((cat) => cat.count > 0);
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
    // Si la pregunta no tiene ID, usar el índice como fallback
    const questionId = question.id || `question-${index}`;

    if (question.type === "multiple_choice") {
      // Para multiple choice, guardar el valor seleccionado
      const selectedValue = multipleChoiceAnswers[questionId];

      if (selectedValue) {
        userAnswers[questionId] = {
          type: "multiple_choice",
          selected_value: selectedValue,
        };
      }
    } else if (question.type === "free_input") {
      // Para free input, guardar el texto
      const textAnswer = freeInputAnswers[index];

      if (textAnswer) {
        userAnswers[questionId] = {
          type: "free_input",
          text_response: textAnswer,
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

/**
 * Hook para actualizar un assessment response
 * Útil si necesitamos modificar las respuestas desde el admin
 */
export function useUpdateAssessmentResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<any>;
    }) => {
      const { data, error } = await supabase
        .from("assessments_response")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("❌ Error updating assessment response:", error);
        throw new Error(
          `Failed to update assessment response: ${error.message}`,
        );
      }

      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidar cache específico de este assessment response
      queryClient.invalidateQueries({
        queryKey: ["assessment-response", variables.id],
      });

      // Invalidar todas las assessment responses
      queryClient.invalidateQueries({
        queryKey: ["assessment-responses"],
      });

      // Invalidar job applicants para actualizar admin drawer
      queryClient.invalidateQueries({
        queryKey: ["job-applicants"],
      });

      console.log(
        "✅ Assessment response updated successfully, cache invalidated",
      );
    },
    onError: (error) => {
      console.error("❌ Error updating assessment response:", error);
    },
  });
}
