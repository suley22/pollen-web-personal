"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Eye,
  User,
  Mail,
  Trophy,
  Clock,
  Briefcase,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applicationFilter] = useState("all");
  const [profileFilter] = useState("all");

  // Fetch all job seekers
  const jobSeekers = [
      {
        id: "20",
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        location: "London, UK",
        registrationDate: "2025-01-10",
        status: "active",
        profileComplete: true,
        assessmentCompleted: false,
        totalApplications: 0,
        lastActivity: "2025-01-15",
        keyStrengths: [],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "21",
        name: "James Mitchell",
        email: "james.mitchell@email.com",
        location: "London, UK",
        registrationDate: "2024-11-22",
        status: "active",
        profileComplete: true,
        assessmentCompleted: true,
        overallSkillsScore: 85,
        totalApplications: 4,
        lastActivity: "2025-01-16",
        keyStrengths: ["Strategic Thinking", "Communication", "Problem Solving"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "22",
        name: "Emma Davis",
        email: "emma.davis@email.com",
        location: "Bristol, UK",
        registrationDate: "2025-01-05",
        status: "active",
        profileComplete: true,
        assessmentCompleted: true,
        overallSkillsScore: 83,
        totalApplications: 2,
        lastActivity: "2025-01-14",
        keyStrengths: ["Creative Campaign Development", "Social Media Strategy"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "23",
        name: "Lucy Williams",
        email: "lucy.williams@email.com",
        location: "Birmingham, UK",
        registrationDate: "2025-01-12",
        status: "active",
        profileComplete: true,
        assessmentCompleted: true,
        overallSkillsScore: 79,
        totalApplications: 1,
        lastActivity: "2025-01-13",
        keyStrengths: ["Communication", "Content Creation", "Brand Awareness"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "24",
        name: "Alex Thompson",
        email: "alex.thompson@email.com",
        location: "Manchester, UK",
        registrationDate: "2025-01-08",
        status: "active",
        profileComplete: true,
        assessmentCompleted: false,
        totalApplications: 1,
        lastActivity: "2025-01-12",
        keyStrengths: ["Analytical Thinking", "Project Management"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "25",
        name: "Maya Patel",
        email: "maya.patel@email.com",
        location: "Leeds, UK",
        registrationDate: "2025-01-14",
        status: "active",
        profileComplete: false,
        assessmentCompleted: false,
        totalApplications: 0,
        lastActivity: "2025-01-14",
        keyStrengths: [],
        experienceLevel: "Entry Level",
        visaStatus: "Work Visa Required"
      },
      {
        id: "26",
        name: "Tom Harrison",
        email: "tom.harrison@email.com",
        location: "Liverpool, UK",
        registrationDate: "2024-12-20",
        status: "inactive",
        profileComplete: true,
        assessmentCompleted: true,
        overallSkillsScore: 76,
        totalApplications: 2,
        lastActivity: "2024-12-28",
        keyStrengths: ["Technical Skills", "Problem Solving"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "27",
        name: "Rachel Green",
        email: "rachel.green@email.com",
        location: "Cardiff, UK",
        registrationDate: "2025-01-16",
        status: "active",
        profileComplete: true,
        assessmentCompleted: false,
        totalApplications: 0,
        lastActivity: "2025-01-16",
        keyStrengths: ["Customer Service", "Team Leadership"],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      },
      {
        id: "28",
        name: "David Wilson",
        email: "david.wilson@email.com",
        location: "Newcastle, UK",
        registrationDate: "2025-01-11",
        status: "active",
        profileComplete: false,
        assessmentCompleted: false,
        totalApplications: 0,
        lastActivity: "2025-01-11",
        keyStrengths: [],
        experienceLevel: "Entry Level",
        visaStatus: "UK Citizen"
      }
    ]

   // Filter job seekers
  const filteredJobSeekers = jobSeekers.filter(jobSeeker => {
    const matchesSearch = jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jobSeeker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jobSeeker.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || jobSeeker.status === statusFilter;
    const matchesApplication = applicationFilter === "all" || 
                              (applicationFilter === "has_applied" && jobSeeker.totalApplications > 0) ||
                              (applicationFilter === "not_applied" && jobSeeker.totalApplications === 0);
    const matchesProfile = profileFilter === "all" ||
                          (profileFilter === "complete" && jobSeeker.profileComplete) ||
                          (profileFilter === "incomplete" && !jobSeeker.profileComplete);

    return matchesSearch && matchesStatus && matchesApplication && matchesProfile;
  });

const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="text-sm bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="text-sm bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      default:
        return <Badge className="text-sm bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const getProfileCompleteBadge = (isComplete) => {
    return isComplete 
      ? <Badge className="text-sm bg-green-100 text-green-800 border-green-200">Complete</Badge>
      : <Badge className="text-sm bg-yellow-100 text-yellow-800 border-yellow-200">Incomplete</Badge>;
  };

  const router = useRouter();

  // helper: cuenta valores únicos de una key en jobSeekers
function summarizeFilters(arr, keys) {
  const result = {};

  keys.forEach(key => {
    let values = [...new Set(arr.map(j => j[key]))];

    // Ordenar según tipo
    if (typeof values[0] === "string") {
      values.sort((a, b) => a.localeCompare(b)); // alfabético
    } else if (typeof values[0] === "boolean") {
      values.sort((a, b) => Number(a) - Number(b)); // false primero
    }

    // Transformar para SelectItem
    const options = values.map(v => ({
      value: String(v),
      label:
        typeof v === "string"
          ? v.charAt(0).toUpperCase() + v.slice(1) // Capitalize strings
          : v === true
          ? "True"
          : "False"
    }));

    result[key] = {
      count: values.length,
      values,
      options // 👈 listo para el UI
    };
  });

  return result;
}

// Uso con tu jobSeekers
const summary = summarizeFilters(jobSeekers, [
  "status",
  "profileComplete",
  "visaStatus",
  "experienceLevel"
]);
  const [filters, setFilters] = useState(
    Object.fromEntries(Object.keys(summary).map(k => [k, "all"]))
  );

  // handler genérico
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };



  return (
    <div>
      <div className="container mx-auto p-4 space-y-4 jobs-page">
        <div className="text-left mb-6">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
              {Object.entries(summary).map(([key, data]) => (
                <Select
                  key={key}
                  value={filters[key]}
                  onValueChange={val => handleChange(key, val)}
                >
                  <SelectTrigger className="w-[200px] capitalize">
                    <SelectValue placeholder={key} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {summary.status.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value= "all">All Statuses</SelectItem>
                    <SelectItem value="active">Pollen Approved</SelectItem>
                    <SelectItem value="inactive">External</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{statusFilter === "all" ? "All Jobs" : statusFilter}</SelectItem>
                    <SelectItem value="pollen">Pollen Approved</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
               
               
               {/* selection components for future use */}
                {/* <div className="w-[180px]">
                  <Select
                    value={
                      industryFilter.includes("all")
                        ? "all"
                        : industryFilter.length === 1
                          ? industryFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setIndustryFilter(["all"]);
                      } else {
                        if (industryFilter.includes("all")) {
                          setIndustryFilter([value]);
                        } else {
                          if (industryFilter.includes(value)) {
                            const newFilter = industryFilter.filter(
                              (i) => i !== value,
                            );
                            setIndustryFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setIndustryFilter([
                              ...industryFilter.filter((i) => i !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {industryFilter.includes("all")
                          ? "All Industries"
                          : industryFilter.length === 1
                            ? industryFilter[0]
                            : `${industryFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries
                        .filter((industry) => industry && industry.trim())
                        .map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  industryFilter.includes(industry) &&
                                  !industryFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {industry}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select
                    value={
                      locationFilter.includes("all")
                        ? "all"
                        : locationFilter.length === 1
                          ? locationFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setLocationFilter(["all"]);
                      } else {
                        if (locationFilter.includes("all")) {
                          setLocationFilter([value]);
                        } else {
                          if (locationFilter.includes(value)) {
                            const newFilter = locationFilter.filter(
                              (l) => l !== value,
                            );
                            setLocationFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setLocationFilter([
                              ...locationFilter.filter((l) => l !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {locationFilter.includes("all")
                          ? "All Locations"
                          : locationFilter.length === 1
                            ? locationFilter[0]
                            : `${locationFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations
                        .filter((location) => location && location.trim())
                        .map((location) => (
                          <SelectItem key={location} value={location}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  locationFilter.includes(location) &&
                                  !locationFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {location}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]"> 
                  <Select
                    value={
                      contractFilter.includes("all")
                        ? "all"
                        : contractFilter.length === 1
                          ? contractFilter[0]
                          : "multiple"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        setContractFilter(["all"]);
                      } else {
                        if (contractFilter.includes("all")) {
                          setContractFilter([value]);
                        } else {
                          if (contractFilter.includes(value)) {
                            const newFilter = contractFilter.filter(
                              (t) => t !== value,
                            );
                            setContractFilter(
                              newFilter.length === 0 ? ["all"] : newFilter,
                            );
                          } else {
                            setContractFilter([
                              ...contractFilter.filter((t) => t !== "all"),
                              value,
                            ]);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {contractFilter.includes("all")
                          ? "All Types"
                          : contractFilter.length === 1
                            ? contractFilter[0]
                            : `${contractFilter.length} selected`}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {contractTypes
                        .filter((type) => type && type.trim())
                        .map((type) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  contractFilter.includes(type) &&
                                  !contractFilter.includes("all")
                                }
                                readOnly
                                className="w-3 h-3"
                              />
                              {type}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>*/}
              </div>
            </div>
          </div>
         
          {/* Jobs Display */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[280px]">
                    Job Seeker
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[180px]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[140px]">
                    Profile
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[100px]">
                    Assessment
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[120px]">
                    Applications
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[200px]">
                    Last Activity
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 w-[200px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

              {filteredJobSeekers.map((jobSeeker) => (
                  <tr key={jobSeeker.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-1 space-x-3">
                        <div className="flex-shrink-0">
                          {jobSeeker.profilePicture ? (
                            <img 
                              src={jobSeeker.profilePicture} 
                              alt={jobSeeker.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6  text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-base">{jobSeeker.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {jobSeeker.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {jobSeeker.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 px-4">
                      {getStatusBadge(jobSeeker.status)}
                    </td>
                    <td className="py-2 px-4">
                      {getProfileCompleteBadge(jobSeeker.profileComplete)}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                          {jobSeeker.assessmentCompleted ? (
                            <>
                              <Trophy className="h-4 w-4 text-blue-500 mr-1" />
                              <span className="text-sm font-medium text-blue-600">
                                {jobSeeker.overallSkillsScore}%
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm text-gray-500">Pending</span>
                            </>
                          )}
                        </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                          <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{jobSeeker.totalApplications}</span>
                        </div>
                    </td>
                    <td className="py-2 px-4">
                      <span className="text-sm text-gray-600">
                          {new Date(jobSeeker.lastActivity).toLocaleDateString('en-GB')}
                        </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => router.push(`/admin/job-seekers/${jobSeeker.id}`)}
                          className="!text-base !font-medium !font-sora text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        </div>
                    </td>
                  </tr>
              ))} 
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
