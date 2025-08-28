"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Users,
} from "lucide-react";

// Función para obtener el badge según el status
const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          Pending
        </span>
      );
    case "approved":
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
          Rejected
        </span>
      );
    default:
      return null;
  }
};

export default function AdminEmployersManagment() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data: applications = [] } = useQuery({
    queryKey: ["/api/admin/employer-applications"],
    queryFn: async () => {
      try {
        // Aquí iría la llamada real a la API cuando esté implementada
        // const response = await fetch('/api/admin/employer-applications');
        // return response.json();

        // Por ahora retornamos datos mock
        const mockData = [
          {
            id: "1",
            companyName: "TechFlow Solutions",
            companySize: "50-200",
            industries: ["Technology & Software"],
            location: "London, UK",
            website: "https://techflow.com",
            contactEmail: "hr@techflow.com",
            contactName: "Sarah Johnson",
            contactRole: "HR Manager",
            contactPhone: "+44 20 7123 4567",
            companyDescription:
              "TechFlow Solutions is a fast-growing technology company specialising in enterprise software solutions. We help businesses streamline their operations through innovative SaaS platforms and custom development services.",
            whyPollen:
              "We believe in skills-based hiring and want to tap into entry-level talent with strong potential. Traditional recruiting hasn't been giving us the diverse, capable candidates we need for our growing team.",
            hiringVolume: "15-50",
            howDidYouHear: "linkedin",
            submittedDate: "2024-01-15",
            status: "pending",
          },
          {
            id: "2",
            companyName: "Creative Studios",
            companySize: "10-50",
            industries: ["Marketing & Advertising", "Media & Creative"],
            location: "Manchester, UK",
            website: "https://creativestudios.co.uk",
            contactEmail: "talent@creativestudios.co.uk",
            contactName: "James Thompson",
            contactRole: "Creative Director",
            contactPhone: "+44 161 234 5678",
            companyDescription:
              "Creative Studios is a boutique creative agency specialising in brand development, digital marketing, and content creation. We work with ambitious brands to create meaningful connections through compelling storytelling.",
            whyPollen:
              "Traditional portfolios don't show creative thinking ability. We want to see how candidates actually approach problems and develop solutions through practical challenges.",
            hiringVolume: "5-15",
            howDidYouHear: "word-of-mouth",
            submittedDate: "2024-01-14",
            status: "pending",
          },
          {
            id: "3",
            companyName: "DataTech Solutions",
            companySize: "200-1000",
            industries: ["Technology & Software", "Finance & Banking"],
            location: "Birmingham, UK",
            website: "https://datatech.io",
            contactEmail: "jobs@datatech.io",
            contactName: "Michael Chen",
            contactRole: "Head of People",
            contactPhone: "+44 121 345 6789",
            companyDescription:
              "DataTech Solutions provides advanced data analytics and business intelligence solutions to enterprise clients. We help organisations make data-driven decisions through cutting-edge analytics platforms.",
            whyPollen:
              "We need analytical minds who can think differently about data problems. Academic credentials don't always translate to practical problem-solving skills that we value.",
            hiringVolume: "15-50",
            howDidYouHear: "search-engine",
            submittedDate: "2024-01-13",
            status: "approved",
            reviewedBy: "Holly (Admin)",
            reviewDate: "2024-01-14",
            reviewNotes:
              "Excellent application with clear company information. Strong alignment with skills-first approach and good hiring volume potential. Approved for platform access.",
          },
        ];
        return mockData;
      } catch (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }
    },
  });

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.industries.some((industry) =>
        industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">        
        <h1 className="text-2xl font-bold text-gray-900 mx-auto px-4 py-4">
            Employers Management
        </h1>                  
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.companyName}
                      </h3>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        {application.industries.join(", ")}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {application.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {application.companySize} employees
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {application.contactEmail}
                      </div>
                      {application.contactPhone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {application.contactPhone}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(
                          application.submittedDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {application.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() =>
                            router.push(`/admin/employers-managment/review/`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review Application
                        </Button>
                      </>
                    )}
                    {application.status === "approved" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          router.push(
                            `/main/admin/employers-managment/review/}`
                          )
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        View Approved
                      </Button>
                    )}
                    {application.status === "rejected" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          router.push(`/main/admin/employers-managment/review/`)
                        }
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        View Rejected
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
