// Importar todo lo común desde shared.js
import {
  Brain,
  Lightbulb,
  CheckCircle,
  Eye,
  FormCard,
  Input,
  Textarea,
  InfoField,
  ASSESSMENT_PLACEHOLDER_CONSTANT,
  ASSESSMENT_SCORING_PLACEHOLDER,
} from "../shared";

export function AssessmentTab({ 
  assessment, 
  updateEditedAssessment 
}) {
  return (
    <FormCard
      icon={<Brain className="h-5 w-5 text-gray-500" />}
      title="Edit Skills Assessment"
    >
      <div className="flex flex-col gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="font-medium text-blue-900 mb-2">
            Assessment Guidelines
          </div>
          <p className="text-sm text-blue-800">
            Update the skills assessment that will help evaluate
            candidates for this role. The assessment should include
            relevant questions, tasks, and scoring criteria.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            id="assessmentTitle"
            name="assessment_title"
            label="Assessment Title"
            value={assessment?.title || ""}
            placeholder="e.g. Marketing Coordinator Skills Assessment"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="estimated_time"
              name="estimated_time"
              label="Estimated Time (minutes)"
              type="number"
              value={assessment?.estimatedTime || ""}
              placeholder="45"
            />

            <Input
              id="total_questions"
              name="total_questions"
              label="Total Questions"
              type="number"
              value={assessment?.totalQuestions || ""}
              placeholder="5"
            />
          </div>

          <Textarea
            id="assessment_instructions"
            name="assessment_instructions"
            label="Assessment Instructions"
            value={assessment?.instructions || ""}
            className="min-h-[100px]"
            placeholder="Please read each question carefully and provide detailed responses. This assessment is designed to evaluate your skills and experience relevant to this role..."
          />
        </div>

        <FormCard
          title="Opening Question"
          icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
        >
          <div className="flex flex-col gap-4">
            <Input
              id="opening_question_title"
              name="opening_question_title"
              label="Question Title"
              value={assessment?.openingQuestion?.title || ""}
              placeholder="Tell us about yourself and your interest in this role"
            />

            <Textarea
              id="opening_question_content"
              name="opening_question_content"
              label="Question Content/Instructions"
              value={assessment?.openingQuestion?.content || ""}
              className="min-h-[80px]"
              placeholder="Please provide a brief introduction about yourself, your background, and what interests you about this position..."
            />
          </div>
        </FormCard>

        <FormCard
          title="Assessment Questions and Tasks"
          icon={<Brain className="h-5 w-5 text-gray-500" />}
        >
          <div className="flex flex-col gap-4">
            <Textarea
              id="assessmentContent"
              name="assessment_content"
              label="Full Assessment Content"
              value={assessment?.generatedContent || ""}
              className="min-h-[300px] font-mono text-sm"
              placeholder={ASSESSMENT_PLACEHOLDER_CONSTANT}
            />

            <div className="text-sm text-gray-600">
              <p>
                <strong>Tip:</strong> Use ### for question headers, and
                provide clear instructions for each section.
              </p>
            </div>
          </div>
        </FormCard>

        <FormCard
          title="Scoring Criteria"
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
        >
          <Textarea
            id="scoring_criteria"
            name="scoring_criteria"
            label="Evaluation Guidelines"
            value={assessment?.scoringCriteria || ""}
            className="min-h-[200px]"
            placeholder={ASSESSMENT_SCORING_PLACEHOLDER}
          />
        </FormCard>

        <FormCard
          title="Assessment Preview"
          icon={<Eye className="h-5 w-5 text-purple-500" />}
        >
          <div className="flex flex-col gap-2">
            <InfoField label="Title" value={assessment?.title} />
            <InfoField
              label="Estimated Time (minutes)"
              value={assessment?.estimatedTime ?? "Not specified"}
            />

            <InfoField
              label="Total Questions"
              value={assessment?.totalQuestions || "Not specified"}
            />

            <InfoField
              label="Opening Question"
              value={
                assessment?.openingQuestion?.title || "Not defined"
              }
            />

            <InfoField
              label="Content Length (characters)"
              value={assessment?.generatedContent?.length || 0}
            />

            <InfoField
              label="Has Scoring Criteria"
              value={assessment?.scoringCriteria ? "Yes" : "No"}
            />
          </div>
        </FormCard>
      </div>
    </FormCard>
  );
}
