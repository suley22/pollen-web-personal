"use client";

import { Divider } from "@/components/design-system";
import { AssessmentCreateFileUploadQuestions } from "../_components/assessment-create-file-upload-questions";
import { AssessmentCreateFileUploadPreview } from "../_components/assessment-create-file-upload-preview";
import { useAssessmentCreateFileUpload } from "../_hooks/assessment-create-file-upload-hook";

interface AssessmentCreateFileUploadViewProps {
  assessmentTitle: string;
  assessmentDescription: string;
  instructionsTitle: string;
  instructionsDescription: string;
}

export function AssessmentCreateFileUploadView({
  assessmentTitle,
  assessmentDescription,
  instructionsTitle,
  instructionsDescription,
}: AssessmentCreateFileUploadViewProps) {
  const {
    questions,
    questionTitle,
    setQuestionTitle,
    questionSubtitle,
    setQuestionSubtitle,
    referenceFiles,
    editingQuestionIndex,
    handleAddReferenceFile,
    handleRemoveReferenceFile,
    handleUpdateReferenceFileName,
    handleAddQuestion,
    handleEditQuestion,
    handleRemoveQuestion,
    handleMoveQuestionUp,
    handleMoveQuestionDown,
    handleCancelEdit,
  } = useAssessmentCreateFileUpload();

  return (
    <div className="flex flex-col gap-6">
      <Divider />

      {/* Questions Form */}
      <AssessmentCreateFileUploadQuestions
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitle}
        questionSubtitle={questionSubtitle}
        setQuestionSubtitle={setQuestionSubtitle}
        referenceFiles={referenceFiles}
        editingQuestionIndex={editingQuestionIndex}
        questions={questions}
        onAddReferenceFile={handleAddReferenceFile}
        onRemoveReferenceFile={handleRemoveReferenceFile}
        onUpdateReferenceFileName={handleUpdateReferenceFileName}
        onAddQuestion={handleAddQuestion}
        onCancelEdit={handleCancelEdit}
        onEditQuestion={handleEditQuestion}
        onRemoveQuestion={handleRemoveQuestion}
        onMoveQuestionUp={handleMoveQuestionUp}
        onMoveQuestionDown={handleMoveQuestionDown}
      />

      {/* Preview */}
      {questions.length > 0 && (
        <AssessmentCreateFileUploadPreview
          assessmentTitle={assessmentTitle}
          assessmentDescription={assessmentDescription}
          instructionsTitle={instructionsTitle}
          instructionsDescription={instructionsDescription}
          questions={questions}
          isEditMode={true}
          onMoveQuestionUp={handleMoveQuestionUp}
          onMoveQuestionDown={handleMoveQuestionDown}
          onEditQuestion={handleEditQuestion}
          onRemoveQuestion={handleRemoveQuestion}
        />
      )}
    </div>
  );
}
