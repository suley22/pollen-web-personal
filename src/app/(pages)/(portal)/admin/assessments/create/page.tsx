"use client";

import {
  PageContainer,
  PageHeader,
  FormCard,
  Input,
  PrimaryButton,
  Divider,
  TextareaInput,
} from "@/components/design-system";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import {
  Building2,
  Plus,
  ChevronUp,
  ChevronDown,
  Trash2,
  Palette,
  HelpCircle,
  FileText,
} from "lucide-react";
import { SecondaryButton } from "@/components/design-system/primary-button";
import type {
  AssessmentCategory,
  CategoryStats,
} from "@/types/assessment-category";
import { CategoryCard } from "@/components/assessments/category-card";
import { AssessmentQuestionCard } from "../test/_components/assessment-question-card";
import { AssessmentProgress } from "../test/_components/assessment-progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MultipleChoiceQuestion {
  title: string;
  description: string;
  options_title: string;
  options: { value: string; label: string; categoryId?: string }[];
  categoryId?: string;
}

// Colores predefinidos con buen contraste
const PRESET_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
  { name: "Pink", value: "#EC4899" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Slate", value: "#64748B" },
];

export default function AdminFormsPage() {
  // Estado para las preguntas creadas
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);

  // Estado para categorías
  const [categories, setCategories] = useState<AssessmentCategory[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3B82F6");

  // Estado para el formulario de nueva pregunta
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [options, setOptions] = useState<
    { value: string; label: string; categoryId?: string }[]
  >([]);
  const [currentOption, setCurrentOption] = useState("");
  const [currentOptionCategory, setCurrentOptionCategory] = useState<
    string | undefined
  >();

  // Estado para el preview del assessment
  const [previewAnswers, setPreviewAnswers] = useState<Record<string, string>>(
    {},
  );

  // Funciones para el preview
  const handlePreviewAnswerChange = (
    questionId: string,
    optionValue: string,
  ) => {
    setPreviewAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const getPreviewAnsweredCount = () => {
    return Object.keys(previewAnswers).length;
  };

  const getPreviewPercentage = () => {
    const total = questions.length;
    if (total === 0) return 0;
    return Math.round((getPreviewAnsweredCount() / total) * 100);
  };

  // Preview - respuestas seleccionadas para preview
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  // Calcular estadísticas de categorías
  const categoryStats = useMemo<CategoryStats[]>(() => {
    const answerCounts = new Map<string, number>();

    // Contar respuestas por categoría
    Object.values(selectedAnswers).forEach((answerId) => {
      questions.forEach((question) => {
        const selectedOption = question.options.find(
          (opt) => opt.value === answerId,
        );
        if (selectedOption?.categoryId) {
          answerCounts.set(
            selectedOption.categoryId,
            (answerCounts.get(selectedOption.categoryId) || 0) + 1,
          );
        }
      });
    });

    const total = Array.from(answerCounts.values()).reduce(
      (sum, count) => sum + count,
      0,
    );

    return categories
      .map((category) => ({
        categoryId: category.id,
        categoryName: category.name,
        color: category.color,
        count: answerCounts.get(category.id) || 0,
        percentage:
          total > 0 ? ((answerCounts.get(category.id) || 0) / total) * 100 : 0,
      }))
      .filter((stat) => stat.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [selectedAnswers, questions, categories]);

  // Función para agregar una categoría
  const handleAddCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory: AssessmentCategory = {
      id: Date.now().toString(),
      name: categoryName.trim(),
      description: categoryDescription.trim(),
      color: categoryColor,
    };

    setCategories([...categories, newCategory]);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryColor("#3B82F6");
  };

  // Función para eliminar una categoría
  const handleRemoveCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  // Estado para el formulario de nueva pregunta

  // Función para agregar una opción
  const handleAddOption = () => {
    if (!currentOption.trim()) return;

    const newOption = {
      value: (options.length + 1).toString(),
      label: currentOption.trim(),
      categoryId: currentOptionCategory,
    };

    setOptions([...options, newOption]);
    setCurrentOption("");
    setCurrentOptionCategory(undefined);
  };

  // Función para eliminar una opción
  const handleRemoveOption = (value: string) => {
    setOptions(options.filter((option) => option.value !== value));
  };

  // Función para eliminar una pregunta
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Función para mover una pregunta hacia arriba
  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return; // No se puede mover la primera pregunta hacia arriba

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    setQuestions(newQuestions);
  };

  // Función para mover una pregunta hacia abajo
  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return; // No se puede mover la última pregunta hacia abajo

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    setQuestions(newQuestions);
  };

  // Función para limpiar el formulario
  const handleClearForm = () => {
    setTitle("");
    setDescription("");
    setOptionsTitle("");
    setOptions([]);
    setCurrentOption("");
  };

  // Función para crear la pregunta
  const handleAddQuestion = () => {
    if (!title.trim() || !optionsTitle.trim() || options.length === 0) {
      alert("Please fill in all required fields and add at least one option");
      return;
    }

    const newQuestion: MultipleChoiceQuestion = {
      title: title.trim(),
      description: description.trim(),
      options_title: optionsTitle.trim(),
      options: options,
    };

    setQuestions([...questions, newQuestion]);
    handleClearForm();
  };

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Assessment"
        subtitle="Select and create a new assessment"
        onBack={() => window.history.back()}
      />

      <FormCard
        title="Assessment Details"
        icon={<Building2 className="h-5 w-5" />}
      >
        <div className="flex flex-col gap-4">
          {/* Assessment Title */}
          <Input
            label="Title"
            type="text"
            name="assessment_title"
            id="assessment_title"
            placeholder="Enter assessment title"
            value={assessmentTitle}
            onChange={(e) => setAssessmentTitle(e.target.value)}
          />

          {/* Assessment Description */}
          <TextareaInput
            label="Description"
            name="assessment_description"
            id="assessment_description"
            placeholder="Enter assessment description"
            value={assessmentDescription}
            onChange={(e) => setAssessmentDescription(e.target.value)}
            rows={3}
          />
        </div>
      </FormCard>

      {/* Categories Section */}
      <FormCard title="Categories" icon={<Palette className="h-5 w-5" />}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="">
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Color
                </Label>
                <Select value={categoryColor} onValueChange={setCategoryColor}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {PRESET_COLORS.map((color) => (
                      <SelectItem
                        className=""
                        key={color.value}
                        value={color.value}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.value }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  label="Category Name"
                  type="text"
                  name="category_name"
                  id="category_name"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <TextareaInput
                label="Category Description"
                name="category_description"
                id="category_description"
                placeholder="Enter category description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Divider />

            <div className="flex justify-end">
              <SecondaryButton
                icon={<Plus />}
                text="Add Category"
                onClick={handleAddCategory}
              />
            </div>
          </div>

          {/* Display categories */}
          {categories.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {categories.map((category) => {
                const categoryOptionsCount = questions
                  .flatMap((q) => q.options)
                  .filter((opt) => opt.categoryId === category.id).length;

                return (
                  <div key={category.id} className="relative">
                    <CategoryCard
                      category={category}
                      optionsCount={categoryOptionsCount}
                    />
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-white hover:bg-red-50 text-red-600 border"
                      title="Remove category"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FormCard>

      <div className="flex flex-row gap-4">
        <FormCard
          title="Question Details"
          icon={<Building2 className="h-5 w-5" />}
          className="flex-1"
        >
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-3">
              {/* Question Title */}
              <Input
                label="Title"
                type="text"
                name="question_title"
                id="question_title"
                placeholder="Enter question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Question Description */}
              <Input
                label="Description"
                type="text"
                name="question_description"
                id="question_description"
                placeholder="Enter question description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                label="Options Title"
                type="text"
                name="options_title"
                id="options_title"
                placeholder="Enter options title"
                value={optionsTitle}
                onChange={(e) => setOptionsTitle(e.target.value)}
              />

              {/* Display added options */}
              {options.length > 0 && (
                <div className="flex flex-col gap-2 py-1">
                  <Label className="text-sm font-semibold text-gray-700">
                    Added Options:
                  </Label>
                  {options.map((option) => {
                    const category = categories.find(
                      (c) => c.id === option.categoryId,
                    );
                    return (
                      <div
                        key={option.value}
                        className="flex items-center justify-between px-3 py-2 border rounded"
                        style={
                          category
                            ? {
                                borderColor: category.color,
                                backgroundColor: `${category.color}10`,
                              }
                            : {}
                        }
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                          {category && (
                            <span
                              className="text-xs"
                              style={{ color: category.color }}
                            >
                              {category.name}
                            </span>
                          )}
                        </div>
                        <SecondaryButton
                          text="Remove"
                          onClick={() => handleRemoveOption(option.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-row gap-2 items-end mt-1">
                <Input
                  label="Add Option"
                  type="text"
                  name="current_option"
                  id="current_option"
                  placeholder="Enter option text"
                  value={currentOption}
                  onChange={(e) => setCurrentOption(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                {categories.length > 0 && (
                  <div className="w-48">
                    <Label className="">Category (Optional)</Label>
                    <Select
                      value={currentOptionCategory}
                      onValueChange={setCurrentOptionCategory}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem className="" value="none">
                          No category
                        </SelectItem>
                        {categories.map((category) => (
                          <SelectItem
                            className=""
                            key={category.id}
                            value={category.id}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <SecondaryButton
                  icon={<Plus />}
                  text="Add Option"
                  onClick={handleAddOption}
                />
              </div>
            </div>

            <Divider />

            <div className="flex flex-row justify-end">
              <PrimaryButton text="Add Question" onClick={handleAddQuestion} />
            </div>
          </div>
        </FormCard>
      </div>

      {/* Assessment Preview */}
      {questions.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Assessment Preview ({questions.length} question
              {questions.length !== 1 ? "s" : ""})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Questions Section - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Assessment Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Preview Mode
                    </h3>
                    <p className="text-sm text-blue-800">
                      This is how your assessment will look to users. Try
                      answering the questions to see the progress tracking. You
                      can still edit questions using the action buttons.
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions */}
              {questions.map((question, index) => {
                // Convert question to AssessmentQuestion format
                const assessmentQuestion = {
                  id: `q-${index}`,
                  title: question.title,
                  description: question.description,
                  options_title: question.options_title,
                  options: question.options,
                };

                return (
                  <div key={index} className="relative">
                    <AssessmentQuestionCard
                      question={assessmentQuestion}
                      questionNumber={index + 1}
                      selectedValue={previewAnswers[`q-${index}`]}
                      onAnswerChange={handlePreviewAnswerChange}
                    />

                    {/* Action Buttons Overlay */}
                    <div className="absolute top-6 right-6 flex flex-row gap-1 bg-white rounded border shadow-sm p-1">
                      <button
                        onClick={() => handleMoveQuestionUp(index)}
                        disabled={index === 0}
                        className={`p-2 rounded transition-colors ${
                          index === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50 text-gray-700"
                        }`}
                        title="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleMoveQuestionDown(index)}
                        disabled={index === questions.length - 1}
                        className={`p-2 rounded transition-colors ${
                          index === questions.length - 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-50 text-gray-700"
                        }`}
                        title="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleRemoveQuestion(index)}
                        className="p-2 rounded bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                        title="Remove question"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Sidebar - 1/3 width */}
            <div className="space-y-6">
              <AssessmentProgress
                answeredCount={getPreviewAnsweredCount()}
                totalCount={questions.length}
                percentage={getPreviewPercentage()}
              />
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
