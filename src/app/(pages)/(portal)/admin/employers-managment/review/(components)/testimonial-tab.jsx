import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Edit, Mail, MessageSquare, Quote } from "lucide-react";
import { useState } from "react";

export function TestimonialTab({ employerProfile }) {
  const [editedValues, setEditedValues] = useState({});
  const [editingSection, setEditingSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [setPendingApproval] = useState(false);
  const [setShowApprovalNotification] = useState(false);

  return (
    <Card className={"p-6"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle style={{ fontFamily: "Sora" }}>
            Employee Testimonials
          </CardTitle>
          <Button
            onClick={() =>
              setExpandedSection(
                expandedSection === "testimonials" ? null : "testimonials",
              )
            }
            variant="outline"
            style={{ fontFamily: "Sora" }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonials
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Company Statement Section - Always Visible */}
        <div className="mb-6 pb-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold text-gray-900"
              style={{ fontFamily: "Sora" }}
            >
              What Makes You a Great Place to Work?
            </h3>
            {editingSection !== "company-statement" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingSection("company-statement");
                  setEditedValues({
                    companyStatement: employerProfile.company_statement || "",
                  });
                }}
                className="hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" />
                <span className="ml-1 text-sm">Edit</span>
              </Button>
            )}
          </div>

          {editingSection === "company-statement" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Statement
                </label>
                <textarea
                  value={editedValues.companyStatement || ""}
                  onChange={(e) =>
                    setEditedValues({
                      ...editedValues,
                      companyStatement: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={4}
                  placeholder="In your own words, what makes your company a brilliant place to work? This will appear in the 'Pollen Insights' section that candidates see. Focus on your culture, development opportunities, and what sets you apart as an employer..."
                  style={{ fontFamily: "Poppins" }}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setPendingApproval(true);
                    setEditingSection(null);
                    setShowApprovalNotification(true);
                    setTimeout(() => setShowApprovalNotification(false), 5000);
                    // Here you would typically call an API to save changes
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  style={{ fontFamily: "Sora" }}
                >
                  Submit for Approval
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingSection(null);
                    setEditedValues({});
                  }}
                  style={{ fontFamily: "Sora" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              {employerProfile.company_statement ? (
                <p className="text-gray-700" style={{ fontFamily: "Poppins" }}>
                  {employerProfile.company_statement}
                </p>
              ) : (
                <div className="text-center py-4">
                  <MessageSquare className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Use this as an opportunity to express in your own words what
                    makes your business special. Share your mission, values,
                    growth opportunities, and what sets you apart - whether
                    you're an established team or just starting your hiring
                    journey.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {expandedSection === "testimonials" ? (
          <div className="space-y-4">
            {/* Email Request Section - Central CTA */}
            <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
              <div className="text-center mb-4">
                <Mail className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <h4
                  className="text-lg font-semibold text-pink-900 mb-2"
                  style={{ fontFamily: "Sora" }}
                >
                  Request Employee Testimonials
                </h4>
                <p
                  className="text-pink-800 text-sm"
                  style={{ fontFamily: "Poppins" }}
                >
                  We'll help you collect authentic testimonials from your team.
                  Junior employee testimonials are especially valuable for
                  peer-led insights.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Member Email Addresses
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md h-20"
                    placeholder="Enter email addresses separated by commas&#10;e.g. sarah@company.com, james@company.com, emma@company.com"
                  />
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Junior employees (first 2-3 years) are preferred for
                    peer-led testimonials
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md h-16"
                    placeholder="Add a personal message about your company's commitment to developing junior talent..."
                  />
                </div>
                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  style={{ fontFamily: "Sora" }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Testimonial Requests
                </Button>
              </div>
            </div>

            {/* Manual Entry Option */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3" style={{ fontFamily: "Sora" }}>
                Add Testimonial Manually
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Junior Marketing Executive"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                    placeholder="Share what makes working here special..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" style={{ fontFamily: "Sora" }}>
                    Save Testimonial
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedSection(null)}
                    style={{ fontFamily: "Sora" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-pink-300 mx-auto mb-4" />
            <h3
              className="text-lg font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "Sora" }}
            >
              Share Employee Success Stories
            </h3>
            <p
              className="text-gray-600 mb-6 max-w-md mx-auto"
              style={{ fontFamily: "Poppins" }}
            >
              Build trust with candidates by highlighting authentic testimonials
              from your team about their career development experience.
            </p>
            <Button
              onClick={() => setExpandedSection("testimonials")}
              className="bg-pink-600 hover:bg-pink-700 text-white"
              style={{ fontFamily: "Sora" }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Request Team Testimonials
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
