"use client"

import { Button } from "@/components/ui/button";
import { 
  Eye,
  Camera,
  Edit,
  MapPin,
  Users,
  Calendar,
  Star,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const employerProfile = {
  id: 0,
  userId: 0,
  companyName: "",
  industry: "",
  industries: [],
  location: "",
  companySize: "",
  foundedYear: 0 | "",
  workingModel: "",
  workingModelTag: "",
  about: "",
  description: "",
  values: [],
  benefits: [],
  perks: [],
  workOptions: [],
  workEnvironment: "",
  logoUrl: "",
  coverImageUrl: "",
  completionPercentage: 0,
  website: "",
  contactEmail: "",
  contactPhone: "",
  linkedinPage: "",
  glassdoorUrl: "",
  careersPage: "",
  approvalStatus: 'pending' | 'approved' | 'requires_changes',
  isComplete: true,
  hasUnapprovedChanges: true,
  lastUpdated: "",
  testimonials: [],
  awards: [],
  programmes: [],
  gallery: [],
  companyStatement: "",
}

export default function EmployerProfileConsolidated() {
  const [setExpandedSection] = useState(null);
  const [setShowReviewModal] = useState(false);
   const [setSelectedReview] = useState<{
    author: "",
    position: "",
    rating: "",
    date: "",
    feedbackQuality: 0,
    communicationSpeed: 0,
    interviewExperience: 0,
    processTransparency: 0,
  } | null>(null);
    return (


    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{fontFamily: 'Sora'}}>Company Profile</h1>
              <p className="text-gray-600 mt-1" style={{fontFamily: 'Poppins'}}>
                Manage the information shared with our talent community
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => window.open("/company-profile/2", "_blank")}
                style={{fontFamily: 'Sora'}}
              >
                <Eye className="w-4 h-4 mr-2" />
                Public View
              </Button>
              <div className="flex gap-2">
                {/* Development Status Switch (remove in production) */}
                {employerProfile.approvalStatus === 'pending' && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Simulate status change for demo purposes
                      window.location.href = window.location.href + '?status=approved';
                    }}
                    className="text-xs"
                  >
                    Demo: Set Live
                  </Button>
                )}
                {employerProfile.approvalStatus === 'approved' && !employerProfile.hasUnapprovedChanges && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Simulate status change for demo purposes
                      window.location.href = window.location.href.split('?')[0] + '?status=changes_pending';
                    }}
                    className="text-xs"
                  >
                    Demo: Edit & Pending
                  </Button>
                )}
                {employerProfile.hasUnapprovedChanges && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Simulate status change for demo purposes
                      window.location.href = window.location.href.split('?')[0] + '?status=approved';
                    }}
                    className="text-xs"
                  >
                    Demo: Approve Changes
                  </Button>
                )}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Simulate status change for demo purposes
                    window.location.href = window.location.href.split('?')[0] + '?status=requires_changes';
                  }}
                  className="text-xs"
                >
                  Demo: Requires Changes
                </Button>

              </div>
            </div>
          </div>
        </div>
        </div>


        <Card className="overflow-hidden mb-6">
          <div className="relative mb-0 rounded-t-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
              alt="CreativeMinds Agency office"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-4xl font-bold" style={{
                  fontFamily: 'Sora', 
                  textShadow: '4px 4px 8px rgba(0,0,0,1), 2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)',
                  filter: 'contrast(1.3) brightness(1.1)',
                  color: '#ffffff'
                }}>CreativeMinds Agency</h1>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={() => setExpandedSection('cover-photo')}
            >
              <Camera className="w-4 h-4 mr-2" />
              Edit Cover
            </Button>
          </div>
          
          {/* Company details section below cover photo */}
          <div className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-6">
                {/* Editable Logo - Hover to edit */}
                <div 
                  className="flex-shrink-0 w-16 h-16 bg-pink-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors group relative"
                  onClick={() => setExpandedSection('logo')}
                  title="Click to edit logo"
                >
                  <span className="text-white text-2xl font-bold" style={{fontFamily: 'Sora'}}>C</span>
                  {/* Edit overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit className="w-4 h-4 text-white" />
                  </div>
                </div>
              
                {/* Company info and rating */}
                <div className="flex-1">
                {/* Industry Tags - Colorful and integrated */}
                {employerProfile?.industries && employerProfile.industries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {employerProfile.industries.map((industry, index) => {
                      // Define colorful industry tag styles
                      const getIndustryStyle = (industry ) => {
                        const styles = {
                          'Marketing & Advertising': 'bg-purple-100 text-purple-800 border-purple-200',
                          'Creative Services': 'bg-pink-100 text-pink-800 border-pink-200',
                          'Digital Media': 'bg-blue-100 text-blue-800 border-blue-200',
                          'Technology & Software': 'bg-green-100 text-green-800 border-green-200',
                          'Finance & Banking': 'bg-indigo-100 text-indigo-800 border-indigo-200',
                          'Healthcare': 'bg-red-100 text-red-800 border-red-200',
                          'Education': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                          'Retail & E-commerce': 'bg-orange-100 text-orange-800 border-orange-200',
                          'Manufacturing': 'bg-gray-100 text-gray-800 border-gray-200',
                          'Consulting': 'bg-teal-100 text-teal-800 border-teal-200',
                          'Media & Entertainment': 'bg-violet-100 text-violet-800 border-violet-200',
                          'Non-Profit': 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        };
                        return styles[industry] || 'bg-blue-100 text-blue-800 border-blue-200';
                      };
                      
                      return (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`${getIndustryStyle(industry)} font-medium px-3 py-1 text-xs border hover:shadow-sm transition-all`}
                        >
                          {industry}
                        </Badge>
                      );
                    })}
                  </div>
                )}
                
                <div className="flex items-center gap-8 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{employerProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{employerProfile.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Founded {employerProfile.foundedYear}</span>
                  </div>
                </div>
                
                {/* Rating and Reviews Row - matches attachment */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-700">4.6</span>
                    <button 
                      onClick={() => {
                        setSelectedReview({
                          author: "Emma Wilson",
                          position: "Junior Marketing Executive", 
                          rating: 5,
                          date: "2 months ago",
                          feedbackQuality: 4.8,
                          communicationSpeed: 4.6, 
                          interviewExperience: 4.7,
                          processTransparency: 4.5
                        });
                        setShowReviewModal(true);
                      }}
                      className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
                    >
                      Candidate Experience (4.6)
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      window.open("https://www.glassdoor.co.uk/Reviews/CreativeMinds-Agency-Reviews-E12345.htm", "_blank", "noopener,noreferrer");
                    }}
                    className="text-green-600 hover:text-green-700 hover:underline cursor-pointer text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Glassdoor Reviews
                  </button>
                </div>
                

                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
)}