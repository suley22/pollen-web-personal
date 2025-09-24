"use client";

import { ArrowLeft, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function PersonaResultsPage() {
  const router = useRouter();

  const searchTerms = {
  // Name matches
  "emma": [
    { id: "22", name: "Emma Thompson", match: "name" },
    { id: "12", name: "Emma Davis", match: "name" }
  ],
  
  // Email matches
  "emma.thompson": [
    { id: "22", name: "Emma Thompson", email: "emma.thompson@email.com", match: "email" }
  ],

  // Location matches
  "london": [
    { id: "7", name: "James Mitchell", location: "London, UK", match: "location" },
    { id: "15", name: "Sarah Wilson", location: "London, UK", match: "location" }
  ],

  // Partial matches
  "marketing": [
    { id: "7", name: "James Mitchell", role: "Marketing Assistant", match: "role" },
    { id: "22", name: "Emma Thompson", role: "Digital Marketing Specialist", match: "role" },
    { id: "3", name: "Alex Chen", role: "Marketing Coordinator", match: "role" }
  ],

  // Multi-field matches
  "alex": [
    { id: "3", name: "Alex Chen", email: "alex.chen@email.com", match: "name+email" },
    { id: "18", name: "Alexandra Smith", email: "alexandra.smith@email.com", match: "name" }
  ],

  // Status matches
  "interview": [
    { id: "7", name: "James Mitchell", status: "Pollen Interview Complete", match: "status" },
    { id: "34", name: "Daniel Foster", status: "Interview Booked", match: "status" },
    { id: "35", name: "Grace Thompson", status: "Interview Requested", match: "status" }
  ],

  // No matches
  "xyz123": []
};

};

// Usage example:
// const results = searchCandidates("emma"); 
// Returns array of matching candidates with Emma in their name
  

  // mock job data

  const job = {
    id: "1",
    title: "Marketing Assistant",
    company: "TechFlow Solutions",
    applicantCount: 19,
    status: "active",
  };

  // mock candidates data

  const candidates = {
    1: {
      id: "1",
      name: "Sofia Rodriguez",
      email: "sofia.rodriguez@email.com",
      location: "Barcelona, Spain",
      phone: "+34 612 345 678",
      profilePicture:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
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
        feedback:
          "Sofia shows exceptional problem-solving skills and technical expertise.",
        reviewStatus: "approved",
      },
    },
    2: {
      id: "2",
      name: "James Wilson",
      email: "james.wilson@email.com",
      location: "Manchester, UK",
      phone: "+44 7890 123456",
      profilePicture:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
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
    3: {
      id: "3",
      name: "Mei Chen",
      email: "mei.chen@email.com",
      location: "Singapore",
      phone: "+65 8765 4321",
      profilePicture:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
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
        feedback:
          "Mei demonstrates strong technical skills and excellent team collaboration.",
        reviewStatus: "approved",
      },
    },
    4: {
      id: "4",
      name: "Mohammed Ahmed",
      email: "mohammed.ahmed@email.com",
      location: "Dubai, UAE",
      phone: "+971 50 123 4567",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
        feedback:
          "Mohammed's technical expertise and leadership potential are impressive.",
        reviewStatus: "approved",
      },
    },
    5: {
      id: "5",
      name: "Julia Schmidt",
      email: "julia.schmidt@email.com",
      location: "Berlin, Germany",
      phone: "+49 170 123 4567",
      profilePicture:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      currentStatus: "new_applicants",
      subStatus: "profile_review",
      displaySubStatus: "Profile Review",
      applicationCount: 2,
      hasPollenInteraction: false,
      lastInteractionDate: null,
      lastPollenTeamMember: null,
      isFastTrack: false,
      jobTitle: "Mobile Developer",
      company: "App Works GmbH",
    },
  };

  
}