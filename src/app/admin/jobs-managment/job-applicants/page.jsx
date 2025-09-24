'use client';

import { ArrowLeft, Eye} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function PersonaResultsPage() {
  const router = useRouter();

    // mock job data

    const job = ({
      id: "1",
      title: "Marketing Assistant",
      company: "TechFlow Solutions",
      applicantCount: 19,
      status: "active"
  });

  // mock candidates data

  const candidates = {
  "1": {
    id: "1",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@email.com",
    location: "Barcelona, Spain",
    phone: "+34 612 345 678",
    profilePicture: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    currentStatus: "new_applicants",
    subStatus: "new_application",
    displaySubStatus: "New Application",
    applicationCount: 2,
    hasPollenInteraction: true,
    lastInteractionDate: "2025-09-23",
    lastPollenTeamMember: "Maria Garcia",
    isFastTrack: true,
    jobTitle: "Senior Frontend Developer",
    company: "TechCo Solutions",
    employerFeedback: {
      hasUnreviewedFeedback: true,
      overallScore: 4.8,
      technicalScore: "Excellent",
      problemSolvingScore: "Outstanding",
      teamFitScore: "Very Good",
      feedback: "Sofia shows exceptional problem-solving skills and technical expertise.",
      reviewStatus: "approved"
    }
  },
  "2": {
    id: "2",
    name: "James Wilson",
    email: "james.wilson@email.com",
    location: "Manchester, UK",
    phone: "+44 7890 123456",
    profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    currentStatus: "in_review",
    subStatus: "technical_review",
    displaySubStatus: "Technical Review",
    applicationCount: 1,
    hasPollenInteraction: false,
    lastInteractionDate: null,
    lastPollenTeamMember: null,
    isFastTrack: false,
    jobTitle: "Backend Developer",
    company: "DataSystems UK",
  },
  "3": {
    id: "3",
    name: "Mei Chen",
    email: "mei.chen@email.com",
    location: "Singapore",
    phone: "+65 8765 4321",
    profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    currentStatus: "interviewing",
    subStatus: "interview_scheduled",
    displaySubStatus: "Interview Scheduled",
    applicationCount: 3,
    hasPollenInteraction: true,
    lastInteractionDate: "2025-09-20",
    lastPollenTeamMember: "Alex Wong",
    isFastTrack: true,
    jobTitle: "Full Stack Developer",
    company: "TechAsia Pte",
    employerFeedback: {
      hasUnreviewedFeedback: false,
      overallScore: 4.5,
      technicalScore: "Very Good",
      problemSolvingScore: "Excellent",
      teamFitScore: "Outstanding",
      feedback: "Mei demonstrates strong technical skills and excellent team collaboration.",
      reviewStatus: "approved"
    }
  },
  "4": {
    id: "4",
    name: "Mohammed Ahmed",
    email: "mohammed.ahmed@email.com",
    location: "Dubai, UAE",
    phone: "+971 50 123 4567",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    currentStatus: "hired",
    subStatus: "onboarding",
    displaySubStatus: "Onboarding",
    applicationCount: 1,
    hasPollenInteraction: true,
    lastInteractionDate: "2025-09-15",
    lastPollenTeamMember: "Sarah Thompson",
    isFastTrack: true,
    jobTitle: "DevOps Engineer",
    company: "Cloud Solutions ME",
    employerFeedback: {
      hasUnreviewedFeedback: false,
      overallScore: 4.9,
      technicalScore: "Outstanding",
      problemSolvingScore: "Excellent",
      teamFitScore: "Excellent",
      feedback: "Mohammed's technical expertise and leadership potential are impressive.",
      reviewStatus: "approved"
    }
  },
  "5": {
    id: "5",
    name: "Julia Schmidt",
    email: "julia.schmidt@email.com",
    location: "Berlin, Germany",
    phone: "+49 170 123 4567",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    currentStatus: "new_applicants",
    subStatus: "profile_review",
    displaySubStatus: "Profile Review",
    applicationCount: 2,
    hasPollenInteraction: false,
    lastInteractionDate: null,
    lastPollenTeamMember: null,
    isFastTrack: false,
    jobTitle: "Mobile Developer",
    company: "App Works GmbH"
  }
};


    return(
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
                <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
                <p className="text-gray-600">{job?.company} • {candidates.length} Applicants</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.push('/admin/job-managment/review')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white border-gray-200 text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Job Details</span>
            </Button>
          </div>
          </div>
        </div>
        </div>
        
    )
}