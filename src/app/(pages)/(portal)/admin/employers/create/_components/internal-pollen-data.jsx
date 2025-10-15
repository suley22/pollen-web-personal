"use client";

import { FormCard } from "@/components/design-system/form-card";
import {
  Select,
  CheckboxGroup,
  InputCheckboxGroup,
} from "@/components/design-system";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
          label="Previous hiring methods"
          id="previous_hiring_methods"
          name="previous_hiring_methods"
          items={HIRING_METHODS}
          allowCustomItems={true}
          initialSelectedItems={initialData.previous_hiring_methods || []}
          columns={2}
        />
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
            How they&apos;ve hired previously
          </Label>
          <Label className="text-xs text-gray-600 mb-3 block">
            Select all methods they have used before
          </Label>

          <CheckboxGroup
            name="how_hired_previously"
            predefinedItems={HIRING_METHODS}
            initialSelectedItems={initialData.how_hired_previously || []}
            columns={2}
          />
        </div>

        {/* Additional notes */}
        <div>
          <Label
            htmlFor="additional_notes"
            className="text-sm font-medium text-gray-700 mb-1.5 block"
          >
            Additional notes
          </Label>
          <Textarea
            name="additional_notes"
            id="additional_notes"
            placeholder="Add any additional notes or comments..."
            className="min-h-[100px] resize-y"
            defaultValue={initialData.additional_notes}
          />
        </div>
      </div>
    </FormCard>
  );
}
