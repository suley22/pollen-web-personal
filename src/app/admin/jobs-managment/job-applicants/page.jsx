"use client";

import { LayoutGrid, Kanban, ArrowLeft, Eye, Search, ChevronDown,ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function JobApplicantsPage() {
  const router = useRouter();
  const job = {
    id: "1",
    title: "Marketing Assistant",
    company: "TechFlow Solutions",
    applicantCount: 19,
    status: "active",
  };

  const scoreFilter = [
  { label: '90+', value: '90', count: 5 },
  { label: '80+', value: '80', count: 12 },
  { label: '70+', value: '70', count: 18 },
  { label: '60+', value: '60', count: 25 },
  { label: '50+', value: '50', count: 30 }
];

  // Mock candidates data with realistic assessment submissions and status flows
  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      location: "London, UK",
      applicationDate: "2025-01-16",
      status: "new_applicants",
      subStatus: "unopened",
      overallSkillsScore: 82,
      profilePicture:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      applicationTime: "2025-01-16T09:30:00Z",
      assessmentSubmission: {
        submittedAt: "2025-01-16T09:30:00Z",
        estimatedTime: "45-60 minutes",
        actualTime: "52 minutes",
        responses: [
          {
            questionId: 1,
            question: "Why did you apply for this Marketing Assistant role?",
            response:
              "I'm passionate about digital marketing and believe this role offers the perfect opportunity to apply my skills while learning from industry experts. The company's innovative approach and commitment to growth align perfectly with my career goals.",
            wordCount: 142,
          },
          {
            questionId: 2,
            question:
              "Describe your approach to creating a social media strategy.",
            response:
              "I start with comprehensive audience research and competitor analysis to identify opportunities. Then I develop a content calendar that balances promotional content with value-adding posts, using platform-specific features to maximize engagement.",
            wordCount: 165,
          },
        ],
      },
    },
    {
      id: "2",
      name: "James Wilson",
      email: "james.w@email.com",
      location: "Manchester, UK",
      applicationDate: "2025-01-15",
      status: "in_progress",
      subStatus: "invited_to_pollen_interview",
      overallSkillsScore: 88,
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      applicationTime: "2025-01-15T14:20:00Z",
      assessmentSubmission: {
        submittedAt: "2025-01-15T14:20:00Z",
        estimatedTime: "45-60 minutes",
        actualTime: "48 minutes",
        responses: [
          {
            questionId: 1,
            question: "Why did you apply for this Marketing Assistant role?",
            response:
              "Having followed the company's growth and innovative campaigns, I see this role as an ideal opportunity to contribute my analytical and creative skills while developing my career in digital marketing.",
            wordCount: 134,
          },
        ],
      },
    },
    {
      id: "3",
      name: "Emma Thompson",
      email: "emma.t@email.com",
      location: "Birmingham, UK",
      applicationDate: "2025-01-14",
      status: "matched_to_employer",
      subStatus: "awaiting_employer",
      overallSkillsScore: 91,
      profilePicture:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      applicationTime: "2025-01-14T11:15:00Z",
    },
    {
      id: "4",
      name: "Michael Chen",
      email: "michael.c@email.com",
      location: "Bristol, UK",
      applicationDate: "2025-01-13",
      status: "complete",
      subStatus: "hired",
      overallSkillsScore: 94,
      profilePicture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      applicationTime: "2025-01-13T16:45:00Z",
    },
    {
      id: "5",
      name: "Sophie Taylor",
      email: "sophie.t@email.com",
      location: "Edinburgh, UK",
      applicationDate: "2025-01-12",
      status: "complete",
      subStatus: "not_progressing",
      overallSkillsScore: 76,
      profilePicture:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      applicationTime: "2025-01-12T10:30:00Z",
      completionStage: "pollen_interview",
      feedback:
        "Good communication skills but technical knowledge needs development.",
    },
  ];

const sortOrder = {
  options: ['asc', 'desc'],
  currentOrder: 'desc',
  
  // Label mapping for display
  labels: {
    asc: 'Ascending',
    desc: 'Descending'
  },

  // Icons for visual representation
  icons: {
    asc: 'ChevronUp',
    desc: 'ChevronDown'
  },

  // Helper function to toggle order
  toggle: () => {
    sortOrder.currentOrder = sortOrder.currentOrder === 'asc' ? 'desc' : 'asc';
  },

  // Function to apply sorting order to array
  applySortOrder: (array, sortFn) => {
    const sorted = [...array].sort(sortFn);
    return sortOrder.currentOrder === 'desc' ? sorted.reverse() : sorted;
  },

  // Sort candidates by different criteria
  sortCandidates: (candidates, sortBy) => {
    return sortOrder.applySortOrder(candidates, (a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'applicationDate':
          return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
        case 'score':
          return a.overallSkillsScore - b.overallSkillsScore;
        default:
          return 0;
      }
    });
  }
};

  const sortBy = {
  options: [
    { value: 'default', label: 'Default Order' },
    { value: 'applicationDate', label: 'Sort by Date Applied' },
    { value: 'name', label: 'Sort by Name' },
    { value: 'score', label: 'Sort by Score' }
  ],
  currentSort: 'default',
  sortOrder: 'desc',
  
  sortCandidates: (candidates) => {
    return candidates.sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy.currentSort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'applicationDate':
          comparison = new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
          break;
        case 'score':
          comparison = a.overallSkillsScore - b.overallSkillsScore;
          break;
        case 'default': {
          // Default sorting: primary status first, then application date within each status
          const statusPriority = {
            'new_applicants': 1,
            'in_progress': 2, 
            'matched_to_employer': 3,
            'complete': 4
          };
          comparison = (statusPriority[a.status ] || 5) - 
                      (statusPriority[b.status ] || 5);
          if (comparison === 0) {
            // Within same status, sort by application date (newest first)
            comparison = new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
          }
          break;
        }
      }
      
      return sortBy.sortOrder === 'desc' ? -comparison : comparison;
    });
  }
};


  const [searchTerm, setSearchTerm] = useState("");

  const [primaryStatusFilter, setPrimaryStatusFilter] = useState([]);
  const [subStatusFilter, setSubStatusFilter] = useState([]);
  
  const subStatusToPrimaryStatus = {
    'Unopened': 'new_applicants',
    'Under Review': 'new_applicants',
    'Invited to Pollen Interview': 'in_progress', 
    'Pollen Interview Complete': 'in_progress',
    'Awaiting Employer': 'matched_to_employer',
    'Interview Requested': 'matched_to_employer',
    'Interview Complete': 'matched_to_employer',
    'Interview Booked': 'matched_to_employer',
    'Offer Issued': 'matched_to_employer',
    'Hired': 'complete',
    'Not Progressing': 'complete'
  };
  const getAvailableSubStatuses = () => {
    if (primaryStatusFilter.length === 0) {
      // If no primary status selected, return all sub-statuses
      return Object.keys(subStatusToPrimaryStatus);
    }
    // Return only sub-statuses that belong to the selected primary statuses
    return Object.keys(subStatusToPrimaryStatus).filter(subStatus =>
      primaryStatusFilter.includes(subStatusToPrimaryStatus[subStatus])
    );
  };

  const getSubStatusLabel = (subStatus) => {
    switch(subStatus) {
      case 'under_review': return 'Under Review';
      case 'unopened': return 'Unopened';
      case 'invited_to_pollen_interview': return 'Invited to Pollen Interview';
      case 'pollen_interview_complete': return 'Pollen Interview Complete';
      case 'awaiting_employer': return 'Awaiting Employer';
      case 'interview_requested': return 'Interview Requested';
      case 'interview_booked': return 'Interview Booked';
      case 'interview_complete': return 'Interview Complete';
      case 'offer_issued': return 'Offer Issued';
      case 'not_progressing': return 'Not Progressing';
      case 'hired': return 'Hired';
      default: return subStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 admin-compact-mode">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job?.title}
                </h1>
                <p className="text-gray-600">
                  {job?.company} • {candidates.length} Applicants
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/jobs-managment/review")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white border-gray-200 text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Job Details</span>
            </Button>
          </div>

          {/* Search, Filters and View Toggle */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>


            {/* Primary Status Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400">
                    Primary Status
                    {primaryStatusFilter.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                        {primaryStatusFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked = primaryStatusFilter.includes("new_applicants");
                      const newValues = isChecked 
                        ? primaryStatusFilter.filter(v => v !== "new_applicants")
                        : [...primaryStatusFilter, "new_applicants"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox 
                      checked={primaryStatusFilter.includes("new_applicants")}
                      className="pointer-events-none"
                    />
                    <span>New</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked = primaryStatusFilter.includes("in_progress");
                      const newValues = isChecked 
                        ? primaryStatusFilter.filter(v => v !== "in_progress")
                        : [...primaryStatusFilter, "in_progress"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox 
                      checked={primaryStatusFilter.includes("in_progress")}
                      className="pointer-events-none"
                    />
                    <span>In Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked = primaryStatusFilter.includes("matched_to_employer");
                      const newValues = isChecked 
                        ? primaryStatusFilter.filter(v => v !== "matched_to_employer")
                        : [...primaryStatusFilter, "matched_to_employer"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox 
                      checked={primaryStatusFilter.includes("matched_to_employer")}
                      className="pointer-events-none"
                    />
                    <span>Matched to Employer</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => {
                      const isChecked = primaryStatusFilter.includes("complete");
                      const newValues = isChecked 
                        ? primaryStatusFilter.filter(v => v !== "complete")
                        : [...primaryStatusFilter, "complete"];
                      setPrimaryStatusFilter(newValues);
                      if (isChecked) setSubStatusFilter([]);
                    }}
                  >
                    <Checkbox 
                      checked={primaryStatusFilter.includes("complete")}
                      className="pointer-events-none"
                    />
                    <span>Complete</span>
                  </DropdownMenuItem>
                  {primaryStatusFilter.length > 0 && (
                    <>
                      <div className="border-t my-1"/>
                      <DropdownMenuItem
                        className="flex items-center justify-center text-blue-600 cursor-pointer"
                        onClick={() => {
                          setPrimaryStatusFilter([]);
                          setSubStatusFilter([]);
                        }}
                      >
                        Clear All
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          {/* Sub Status Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400"
                    disabled={getAvailableSubStatuses().length === 0}
                  >
                    Sub Status
                    {subStatusFilter.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                        {subStatusFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {getAvailableSubStatuses().length === 0 ? (
                    <DropdownMenuItem disabled className="text-gray-500">
                      Select primary status first
                    </DropdownMenuItem>
                  ) : (
                    <>
                      {getAvailableSubStatuses().map(subStatus => (
                        <DropdownMenuItem
                          key={subStatus}
                          className="flex items-center space-x-2 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => {
                            const isChecked = subStatusFilter.includes(subStatus);
                            const newValues = isChecked 
                              ? subStatusFilter.filter(v => v !== subStatus)
                              : [...subStatusFilter, subStatus];
                            setSubStatusFilter(newValues);
                          }}
                        >
                          <Checkbox 
                            checked={subStatusFilter.includes(subStatus)}
                            className="pointer-events-none"
                          />
                          <span>{getSubStatusLabel(subStatus)}</span>
                        </DropdownMenuItem>
                      ))}
                      {subStatusFilter.length > 0 && (
                        <>
                          <div className="border-t my-1"/>
                          <DropdownMenuItem
                            className="flex items-center justify-center text-[#E2007A] cursor-pointer"
                            onClick={() => setSubStatusFilter([])}
                          >
                            Clear All
                          </DropdownMenuItem>
                        </>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Score Filter */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-3 py-2 h-9 text-sm border-gray-300 hover:border-gray-400">
                    {scoreFilter.length === 0 ? "All Scores" : `${scoreFilter.length} Score Range${scoreFilter.length !== 1 ? 's' : ''}`}
                    {scoreFilter.length > 0 && (
                      <Badge className="ml-2 bg-[#E2007A] text-white text-xs min-w-[18px] h-4 rounded-full flex items-center justify-center p-0">
                        {scoreFilter.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  {['90+', '80+', '70+', '60+', '50+'].map(scoreRange => (
                    <DropdownMenuItem
                      key={scoreRange}
                      className="flex items-center space-x-2 cursor-pointer"
                      onSelect={(e) => e.preventDefault()}

                      //TODO: implement score filter functionality
                      // onClick={() => {
                      //   const isChecked = scoreFilter.includes(scoreRange);
                      //   const newValues = isChecked 
                      //     ? scoreFilter.filter(v => v !== scoreRange)
                      //     : [...scoreFilter, scoreRange];
                      //   setScoreFilter(newValues);
                      // }}
                    >
                      <Checkbox 
                        checked={scoreFilter.includes(scoreRange)}
                        className="pointer-events-none"
                      />
                      <span>{scoreRange}% Score</span>
                    </DropdownMenuItem>
                  ))}
                  {scoreFilter.length > 0 && (
                    <>
                      <div className="border-t my-1"/>
                      <DropdownMenuItem
                        className="flex items-center justify-center text-blue-600 cursor-pointer"
                        // TODO: implement clear all functionality
                        // onClick={() => setScoreFilter([])}
                      >
                        Clear All
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>


            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <select 
                value={sortBy} 
                // onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="default">Default Order</option>
                <option value="applicationDate">Sort by Date Applied</option>
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
              </select>
              <button
                // onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-2 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            <ToggleGroup 
              type="single" 
              // value={viewMode} 
              // onValueChange={(value) => value && setViewMode(value as "kanban" | "grid")}
              className="bg-gray-100 rounded-lg p-1"
            >
              <ToggleGroupItem value="kanban" className="flex items-center gap-2 px-3 py-2">
                <Kanban className="h-4 w-4" />
                Kanban
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" className="flex items-center gap-2 px-3 py-2">
                <LayoutGrid className="h-4 w-4" />
                Grid
              </ToggleGroupItem>
            </ToggleGroup>

            



          </div>
        </div>
      </div>
    </div>
  );
}
