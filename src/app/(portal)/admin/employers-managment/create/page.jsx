"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProfilePage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-row items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="!mb-0 text-4xl px-4 font-bold text-gray-900">
          Create a New Employer Profile
        </h1>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Employer Information */}
          <Card className="bg-white">
            <CardContent className="">
              <div className="flex items-center space-y-1.5 p-6">
                <Building2 />
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Employer Details
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Industry */}
                  <div>
                    <Label
                      htmlFor="employer_industry"
                      className="mb-1 text-gray-600"
                    >
                      Industry
                    </Label>
                    <Input
                      type="text"
                      name="employer_industry"
                      className="w-full border p-2 rounded"
                      placeholder="Industry"
                    />
                  </div>

                  {/* Company Size */}
                  <div>
                    <Label
                      htmlFor="employer_size"
                      className="mb-1 text-gray-600"
                    >
                      Company Size
                    </Label>
                    <Select placeholder="Select company size">
                      <SelectTrigger className="h-9 px-3 py-1 text-sm">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501-1000">
                          501-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label
                      htmlFor="employer_location"
                      className="mb-1 text-gray-600"
                    >
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="employer_location"
                      className="w-full border p-2 rounded"
                      placeholder="Location"
                    />
                  </div>

                  {/* Founded */}
                  <div>
                    <Label
                      htmlFor="employer_founded"
                      className="mb-1 text-gray-600"
                    >
                      Founded
                    </Label>
                    <Input
                      type="text"
                      name="employer_founded"
                      className="w-full border p-2 rounded"
                      placeholder="Founded"
                    />
                  </div>

                  {/* Website */}
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="employer_website"
                      className="mb-1 text-gray-600"
                    >
                      Website
                    </Label>
                    <Input
                      type="text"
                      name="employer_website"
                      className="w-full border p-2 rounded"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About the Employer */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                About the Employer
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* Work Environment */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Work Environment
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* Pollen loves */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Pollen loves
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* entry-level */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Entry-Level Support
              </h3>
              <Textarea />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {/* Employer Information */}
          <Card className="bg-white">
            <CardContent className="">
              <div className="flex items-center space-y-1.5 p-6">
                <Building2 />
                <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                  Employer Details
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Industry */}
                  <div>
                    <Label
                      htmlFor="employer_industry"
                      className="mb-1 text-gray-600"
                    >
                      Industry
                    </Label>
                    <Input
                      type="text"
                      name="employer_industry"
                      className="w-full border p-2 rounded"
                      placeholder="Industry"
                    />
                  </div>

                  {/* Company Size */}
                  <div>
                    <Label
                      htmlFor="employer_size"
                      className="mb-1 text-gray-600"
                    >
                      Company Size
                    </Label>
                    <Select placeholder="Select company size">
                      <SelectTrigger className="h-9 px-3 py-1 text-sm">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501-1000">
                          501-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label
                      htmlFor="employer_location"
                      className="mb-1 text-gray-600"
                    >
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="employer_location"
                      className="w-full border p-2 rounded"
                      placeholder="Location"
                    />
                  </div>

                  {/* Founded */}
                  <div>
                    <Label
                      htmlFor="employer_founded"
                      className="mb-1 text-gray-600"
                    >
                      Founded
                    </Label>
                    <Input
                      type="text"
                      name="employer_founded"
                      className="w-full border p-2 rounded"
                      placeholder="Founded"
                    />
                  </div>

                  {/* Website */}
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="employer_website"
                      className="mb-1 text-gray-600"
                    >
                      Website
                    </Label>
                    <Input
                      type="text"
                      name="employer_website"
                      className="w-full border p-2 rounded"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About the Employer */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                About the Employer
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* Work Environment */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Work Environment
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* Pollen loves */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Pollen loves
              </h3>
              <Textarea />
            </CardContent>
          </Card>

          {/* entry-level */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-6">
              <h3 className="!mb-0 text-lg font-semibold text-gray-900">
                Entry-Level Support
              </h3>
              <Textarea />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
