"use client";

import { FormCard } from "@/components/design-system/form-card";
import {
  Select,
  Textarea,
  CheckboxGroup,
  InputCheckboxGroup,
} from "@/components/design-system";
import { EyeOff } from "lucide-react";
import { HOW_HEARD_OPTIONS } from "@/lib/configs/constants/how-heard-about-us";
import { HIRING_FREQUENCY_OPTIONS } from "@/lib/configs/constants/hiring-frequency";
import { HIRING_METHODS } from "@/lib/configs/constants/hiring-methods";

export function InternalPollenData({ initialData = {} }) {
  return (
    <FormCard
      title="Internal Pollen Data"
      icon={<EyeOff className="h-5 w-5" />}
    >
      <div className="space-y-6">
        {/* How did you hear about us? */}
        <Select
          label="How did you hear about us?"
          name="how_did_you_hear_about_us"
          id="how_did_you_hear_about_us"
          options={HOW_HEARD_OPTIONS}
          placeholder="Select an option"
          defaultValue={initialData.how_did_you_hear_about_us}
        />

        {/* More Information */}
        <Textarea
          label="More info (if applicable)"
          name="more_info"
          id="more_info"
          placeholder="e.g Name of referrer, specific event, etc."
          className="min-h-[80px] resize-y"
          defaultValue={initialData.more_info}
        />

        {/* Frequency of hiring at entry level */}
        <Select
          label="Frequency of hiring at entry level"
          name="hiring_frequency"
          id="hiring_frequency"
          options={HIRING_FREQUENCY_OPTIONS}
          placeholder="Select an option"
          defaultValue={initialData.hiring_frequency}
        />

        {/* Previous hiring methods */}
        <InputCheckboxGroup
          label="How they've hired previously"
          subtitle="Select all methods they have used before or add your own"
          id="previous_hiring_methods"
          name="previous_hiring_methods"
          items={HIRING_METHODS}
          allowCustomItems={true}
          initialSelectedItems={initialData.previous_hiring_methods || []}
          columns={2}
        />

        {/* Additional notes */}
        <Textarea
          label="Additional notes"
          name="additional_notes"
          id="additional_notes"
          placeholder="Add any additional notes or comments..."
          className="min-h-[100px] resize-y"
          defaultValue={initialData.additional_notes}
        />
      </div>
    </FormCard>
  );
}
