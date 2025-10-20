"use client";

import { PageContainer, PageHeader } from "@/components/design-system";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AdminFormsPage() {
  const options = [
    { value: "1", label: "Take charge and lead the way" },
    { value: "2", label: "Collaborate and seek consensus" },
    { value: "3", label: "Support others and follow directions" },
    { value: "4", label: "Analyze and provide insights" },
  ];

  return (
    <PageContainer>
      <PageHeader
        showBackButton={true}
        title="Create Assessment"
        description="Select and create a new assessment"
        onBack={() => window.history.back()}
      />

      <div className="flex flex-col gap-4">
        <Card id="multiple-choice" className="p-6 gap-3">
          <div id="header">
            <div className="font-semibold text-xl">
              When working through something with other people
            </div>
            <div className="text-sm text-gray-600">
              Like planning an event, solving a problem, or organising
              something...
            </div>
          </div>
          <div className="border-b border-grey h-[1px] w-full p-1" />
          <div id="content" className="flex flex-col gap-1 mt-2 text-md">
            <div id="content-title" className="font-medium">
              Most of the time, I prefer to:
            </div>
            <div id="content-title" className="font-medium mt-2 mb-3">
              <RadioGroup
                className="flex flex-col gap-3 pl-2"
                value={1}
                onValueChange={(value) => {}}
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
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
      </div>
      <div className="flex flex-col gap-4">
        <Card id="multiple-choice" className="p-6 gap-3">
          <div id="header">
            <div className="font-semibold text-xl">
              When working through something with other people
            </div>
            <div className="text-sm text-gray-600">
              Like planning an event, solving a problem, or organising
              something...
            </div>
          </div>
          <div className="border-b border-grey h-[1px] w-full p-1" />
          <div id="content" className="flex flex-col gap-1 mt-2 text-md">
            <div id="content-title" className="font-medium">
              Most of the time, I prefer to:
            </div>
            <div id="content-title" className="font-medium mt-2 mb-3">
              <RadioGroup
                className="flex flex-col gap-3 pl-2"
                value={1}
                onValueChange={(value) => {}}
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
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
      </div>
    </PageContainer>
  );
}
