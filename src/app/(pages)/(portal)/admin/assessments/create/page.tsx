"use client";

import {
  PageContainer,
  PageHeader,
  FormCard,
  Input,
  PrimaryButton,
  Divider,
} from "@/components/design-system";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { SecondaryButton } from "@/components/design-system/primary-button";

interface MultipleChoiceQuestion {
  title: string;
  description: string;
  options_title: string;
  options: { value: string; label: string }[];
}

export default function AdminFormsPage() {
  // Estado para las preguntas creadas
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);

  // Estado para el formulario de nueva pregunta
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionsTitle, setOptionsTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [currentOption, setCurrentOption] = useState("");

  // Función para agregar una opción
  const handleAddOption = () => {
    if (!currentOption.trim()) return;

    const newOption = {
      value: (options.length + 1).toString(),
      label: currentOption.trim(),
    };

    setOptions([...options, newOption]);
    setCurrentOption("");
  };

  // Función para eliminar una opción
  const handleRemoveOption = (value: string) => {
    setOptions(options.filter((option) => option.value !== value));
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
        description="Select and create a new assessment"
        onBack={() => window.history.back()}
      />

      <FormCard
        title="Assessment Details"
        icon={<Building2 className="h-5 w-5" />}
        className="flex-1"
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
          <Input
            label="Description"
            type="text"
            name="assessment_description"
            id="assessment_description"
            placeholder="Enter assessment description"
            value={assessmentDescription}
            onChange={(e) => setAssessmentDescription(e.target.value)}
          />
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
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center justify-between px-2 py-1 border rounded"
                    >
                      <span className="text-sm">{option.label}</span>
                      <SecondaryButton
                        text="Remove"
                        onClick={() => handleRemoveOption(option.value)}
                      />
                    </div>
                  ))}
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
    </PageContainer>
  );
}

export function AdminMultipleChoiceQuestionCard({
  question,
}: {
  question?: MultipleChoiceQuestion;
}) {
  const options = question?.options || [];

  return (
    <Card id="multiple-choice" className="p-6 gap-3">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-xl">{question?.title}</div>
        <div className="text-sm text-gray-600">{question?.description}</div>
      </div>
      <Divider />
      <div id="content" className="flex flex-col gap-1 mt-2 text-md">
        <div id="content-title" className="font-medium">
          {question?.options_title}
        </div>
        <div id="content-title" className="font-medium mt-2 mb-3">
          {/* @ts-ignore */}
          <RadioGroup
            className="flex flex-col gap-3 pl-2"
            value="1"
            onValueChange={() => {}}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                {/* @ts-ignore */}
                <RadioGroupItem
                  value={option.value}
                  id={`impact-${option.value}`}
                />
                <Label
                  htmlFor={`impact-${option.value}`}
                  className="font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
