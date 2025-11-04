"use client";

interface AssessmentQuestion {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  description?: string;
  multiple_choice?: {
    options: Array<{
      value: string;
      label?: string;
    }>;
  };
  user_answer?: {
    selected_value?: string;
    text_response?: string;
    uploaded_file?: {
      name?: string;
      size?: number;
      url?: string;
    };
  };
  category_results?: Array<{
    id: string;
    name?: string;
    title?: string;
    percentage: number;
    count: number;
    description?: string;
  }>;
  calculated_at?: string;
}

interface AssessmentPreviewProps {
  /**
   * Título del assessment
   */
  title?: string;

  /**
   * Subtítulo o descripción del assessment
   */
  subtitle?: string;

  /**
   * Lista de preguntas del assessment
   */
  questions: AssessmentQuestion[];

  /**
   * Mostrar la sección de resumen de categorías
   */
  showCategorySummary?: boolean;

  /**
   * Estado de carga
   */
  isLoading?: boolean;

  /**
   * Mensaje de error
   */
  error?: string;
}

/**
 * Componente para mostrar el preview de las respuestas de un assessment
 */
export function AssessmentPreview({
  title = "Assessment",
  subtitle = "Assessment completed by the candidate",
  questions,
  showCategorySummary = true,
  isLoading = false,
  error,
}: AssessmentPreviewProps) {
  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm">
          Error loading assessment responses: {error}
        </p>
      </div>
    );
  }

  // Sin preguntas
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-600 text-center">
          No assessment responses available for this candidate.
        </p>
      </div>
    );
  }

  // Filtrar preguntas regulares y datos de resultados
  const regularQuestions = questions.filter(
    (q) => q.type !== "assessment_results",
  );
  const resultsData = questions.find((q) => q.type === "assessment_results");
  const categoryResults = resultsData?.category_results;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Assessment Responses
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Skills Assessment
        </span>
      </div>

      {/* Assessment Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="font-medium text-blue-900 mb-2">{title}</div>
        <p className="text-sm text-blue-700">{subtitle}</p>
      </div>

      {/* Questions and Responses */}
      <div className="space-y-8">
        {regularQuestions.map((question, index) => (
          <QuestionResponse key={question.id || index} question={question} />
        ))}
      </div>

      {/* Category Results Summary */}
      {showCategorySummary && categoryResults && categoryResults.length > 0 && (
        <CategorySummary
          categories={categoryResults}
          calculatedAt={resultsData?.calculated_at}
        />
      )}
    </div>
  );
}

/**
 * Componente para mostrar una pregunta y su respuesta
 */
function QuestionResponse({ question }: { question: AssessmentQuestion }) {
  const userAnswer = question.user_answer;

  return (
    <div className="border-b border-gray-100 pb-6 last:border-b-0">
      {/* Question */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {question.title}
        </h3>
        {question.subtitle && (
          <p className="text-sm text-gray-600 mb-2">{question.subtitle}</p>
        )}
        {question.description && (
          <p className="text-sm text-gray-600">{question.description}</p>
        )}
      </div>

      {/* Answer */}
      <div className="ml-4">
        {question.type === "multiple_choice" ? (
          <MultipleChoiceAnswer
            options={question.multiple_choice?.options || []}
            userAnswer={userAnswer}
          />
        ) : question.type === "free_input" ? (
          <FreeInputAnswer userAnswer={userAnswer} />
        ) : question.type === "file_upload" ? (
          <FileUploadAnswer userAnswer={userAnswer} />
        ) : (
          <div className="text-gray-500 italic">
            Tipo de pregunta no reconocido
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Componente para mostrar respuesta de multiple choice
 */
function MultipleChoiceAnswer({
  options,
  userAnswer,
}: {
  options: Array<{ value: string; label?: string }>;
  userAnswer?: AssessmentQuestion["user_answer"];
}) {
  return (
    <div>
      <div className="space-y-2 mb-4">
        {options.map((option) => {
          const isSelected =
            userAnswer?.selected_value === option.value ||
            userAnswer?.text_response === option.value;

          return (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                isSelected
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={isSelected ? "font-medium" : ""}>
                {option.label || option.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* No answer provided */}
      {!userAnswer?.selected_value && !userAnswer?.text_response && (
        <div className="text-gray-500 italic p-3">
          No se proporcionó respuesta
        </div>
      )}
    </div>
  );
}

/**
 * Componente para mostrar respuesta de texto libre
 */
function FreeInputAnswer({
  userAnswer,
}: {
  userAnswer?: AssessmentQuestion["user_answer"];
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      {userAnswer?.text_response ? (
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {userAnswer.text_response}
        </p>
      ) : (
        <p className="text-gray-500 italic">No se proporcionó respuesta</p>
      )}
    </div>
  );
}

/**
 * Componente para mostrar respuesta de archivo subido
 */
function FileUploadAnswer({
  userAnswer,
}: {
  userAnswer?: AssessmentQuestion["user_answer"];
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      {userAnswer?.uploaded_file ? (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {userAnswer.uploaded_file.name || "Archivo subido"}
            </p>
            <p className="text-sm text-gray-600">
              {userAnswer.uploaded_file.size
                ? `${(userAnswer.uploaded_file.size / (1024 * 1024)).toFixed(1)} MB`
                : "Tamaño desconocido"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No se subió archivo</p>
      )}
    </div>
  );
}

/**
 * Componente para mostrar el resumen de categorías
 */
function CategorySummary({
  categories,
  calculatedAt,
}: {
  categories: Array<{
    id: string;
    name?: string;
    title?: string;
    percentage: number;
    count: number;
    description?: string;
  }>;
  calculatedAt?: string;
}) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Category Summary
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-900">
                {category.name || category.title || `Category ${category.id}`}
              </h5>
              <span className="text-lg font-bold text-blue-700">
                {category.percentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{category.count} responses</span>
              <span className="font-medium">
                {category.percentage > 50
                  ? "Strong"
                  : category.percentage > 25
                    ? "Moderate"
                    : "Low"}{" "}
                tendency
              </span>
            </div>

            {category.description && (
              <p className="text-xs text-gray-600 mt-2">
                {category.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Note:</span> Category percentages are
          calculated based on multiple choice responses. Results calculated at:{" "}
          {calculatedAt ? new Date(calculatedAt).toLocaleString() : "N/A"}
        </p>
      </div>
    </div>
  );
}
