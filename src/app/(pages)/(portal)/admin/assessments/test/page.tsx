"use client";

import { AssessmentTestView } from "./_view/assessment-test-view";
import type { Assessment } from "@/types/assessment";

// Mock data for demonstration
const mockAssessment: Assessment = {
  id: "1",
  title: "Career Interests Assessment",
  description:
    "This assessment will help us understand your career interests and preferences to provide better job recommendations.",
  categories: [
    {
      id: "cat-1",
      name: "Technical Skills",
      description: "Questions about technical abilities",
      color: "#3B82F6",
    },
    {
      id: "cat-2",
      name: "Work Environment",
      description: "Questions about preferred work setting",
      color: "#10B981",
    },
    {
      id: "cat-3",
      name: "Team Dynamics",
      description: "Questions about team collaboration",
      color: "#8B5CF6",
    },
  ],
  questions: [
    {
      id: "q1",
      title: "What type of work environment do you prefer?",
      description: "Select the option that best describes your ideal workplace",
      options_title: "Choose your preferred environment:",
      options: [
        {
          value: "office",
          label: "Traditional office setting with in-person collaboration",
          categoryId: "cat-2",
        },
        {
          value: "remote",
          label: "Fully remote with flexible working hours",
          categoryId: "cat-2",
        },
        {
          value: "hybrid",
          label: "Hybrid model with both office and remote options",
          categoryId: "cat-2",
        },
      ],
    },
    {
      id: "q2",
      title: "How do you prefer to work on projects?",
      description: "Think about your most productive working style",
      options_title: "Select your preference:",
      options: [
        {
          value: "solo",
          label: "Independently with minimal collaboration",
          categoryId: "cat-3",
        },
        {
          value: "small-team",
          label: "In small teams of 2-5 people",
          categoryId: "cat-3",
        },
        {
          value: "large-team",
          label: "In larger teams with diverse perspectives",
          categoryId: "cat-3",
        },
      ],
    },
    {
      id: "q3",
      title: "What technical skills are you most interested in developing?",
      description: "Select the area you'd like to focus on in your career",
      options_title: "Choose your focus area:",
      options: [
        {
          value: "frontend",
          label: "Frontend development (UI/UX, React, Design)",
          categoryId: "cat-1",
        },
        {
          value: "backend",
          label: "Backend development (APIs, Databases, Systems)",
          categoryId: "cat-1",
        },
        {
          value: "fullstack",
          label: "Full-stack development (Both frontend and backend)",
          categoryId: "cat-1",
        },
        {
          value: "devops",
          label: "DevOps and Infrastructure",
          categoryId: "cat-1",
        },
      ],
    },
  ],
};

export default function AssessmentTestPage() {
  const handleSubmit = async (response: any) => {
    console.log("Assessment response:", response);
    // Here you would typically send the response to your API
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <AssessmentTestView assessment={mockAssessment} onSubmit={handleSubmit} />
  );
}
