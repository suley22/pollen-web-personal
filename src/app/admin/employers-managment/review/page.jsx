<<<<<<< HEAD
export default function ReviewPage() {
    return (
        <div>
            <h1>Review</h1>
        </div>
    );
}
=======
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
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  approvalStatus: 'pending',
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
  /** @type {{author:string, position:string, rating:number, date:string, feedbackQuality?:number, communicationSpeed?:number, interviewExperience?:number, processTransparency?:number} | null} */
  const [ setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingSection, setEditingSection] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [setPendingApproval] = useState(false);
  const [setShowApprovalNotification] = useState(false);

  const getStatusInfo = () => {
    if (!employerProfile) return null;
    
    if (employerProfile.approvalStatus === 'pending') {
      return {
        type: 'review',
        icon: Clock,
        title: 'Profile Under Review',
        message: 'Our team will review your profile and it\'s usually approved within 24 hours. You can continue adding enhancements below.',
        bgColor: 'bg-blue-50',
        borderColor: 'border-l-blue-500',
        textColor: 'text-blue-900',
        iconColor: 'text-blue-600'
      };
    }
    
    if (employerProfile.hasUnapprovedChanges) {
      return {
        type: 'changes_pending',
        icon: AlertCircle,
        title: 'Changes Pending Approval',
        message: 'Your recent edits are being reviewed and will be live within 24 hours. Your current live profile remains visible to candidates.',
        bgColor: 'bg-orange-50',
        borderColor: 'border-l-orange-500',
        textColor: 'text-orange-900',
        iconColor: 'text-orange-600'
      };
    }
    
    if (employerProfile.approvalStatus === 'approved') {
      return {
        type: 'live',
        icon: CheckCircle,
        title: 'Profile Live',
        message: 'Your company profile is live and visible to candidates. Any edits will need approval before going live.',
        bgColor: 'bg-green-50',
        borderColor: 'border-l-green-500',
        textColor: 'text-green-900',
        iconColor: 'text-green-600'
      };
    }
    
    if (employerProfile.approvalStatus === 'requires_changes') {
      return {
        type: 'requires_changes',
        icon: AlertCircle,
        title: 'Changes Required',
        message: 'Your profile requires some updates before it can go live. Please review the feedback below and make the necessary changes. Changes usually take effect within 24 hours.',
        bgColor: 'bg-red-50',
        borderColor: 'border-l-red-500',
        textColor: 'text-red-900',
        iconColor: 'text-red-600',
        feedback: 'Hi there! We\'ve reviewed your profile and it looks great overall. However, we need you to update the company description to be more specific about the services you offer and your target clients. Also, please add at least 2-3 employee testimonials to help candidates understand your company culture better. Once these changes are made, we\'ll approve your profile within 24 hours. Thanks! - The Pollen Team'
      };
    }
    
    // Default fallback
    return {
      type: 'review',
      icon: Clock,
      title: 'Profile Under Review',
      message: 'Our team will review your profile and it\'s usually approved within 24 hours. You can continue adding enhancements below.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500',
      textColor: 'text-blue-900',
      iconColor: 'text-blue-600'
    };
  };
  const statusInfo = getStatusInfo();
    

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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Navigation - Always visible */}
          <div className="sticky top-0 z-10 bg-gray-50 pb-6">
            <TabsList className="grid w-full grid-cols-5 bg-white border rounded-lg p-1 shadow-sm h-12">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Overview</span>
                  {(!employerProfile.about && !employerProfile.description) && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="testimonials"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Testimonials</span>
                  {!employerProfile.testimonials?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="recognition"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Recognition</span>
                  {!employerProfile.awards?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="programmes"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Initiatives</span>
                  {!employerProfile.programmes?.length && (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery"
                  className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-700 data-[state=active]:border-pink-200 data-[state=active]:shadow-sm transition-all duration-200 rounded-md border border-transparent px-2 py-2 mx-1 h-10 flex items-center justify-center text-sm"
                >
                  <span className="font-medium">Gallery</span>
                  {!employerProfile.gallery?.length ? (
                    <span className="ml-1 text-xs text-gray-500">+</span>
                  ) : (
                    <span className="ml-1 text-xs text-green-600">✓</span>
                  )}
                </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Main Profile Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Company Description */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle style={{fontFamily: 'Sora'}}>About {employerProfile.companyName}</CardTitle>
                    {editingSection !== 'about' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setEditingSection('about');
                          setEditedValues({about: employerProfile.about || employerProfile.description || ''});
                        }}
                        className="hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="ml-1 text-sm">Edit</span>
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {editingSection === 'about' ? (
                      <div className="space-y-4">
                        <textarea
                          value={editedValues.about || ''}
                          onChange={(e) => setEditedValues({...editedValues, about: e.target.value})}
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          rows={4}
                          placeholder="Describe your company..."
                          style={{fontFamily: 'Poppins'}}
                        />
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
                            style={{fontFamily: 'Sora'}}
                          >
                            Submit for Approval
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setEditingSection(null);
                              setEditedValues({});
                            }}
                            style={{fontFamily: 'Sora'}}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                                        ) : (
                      null
                    )}
                  </CardContent>
                </Card>

                {/* Mission Statement */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle style={{fontFamily: 'Sora'}}>Our Mission</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingSection('mission');
                        setEditedValues({ mission: employerProfile?.about || '' });
                      }}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-1 text-sm">Edit</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {editingSection === 'mission' ? (
                      <div className="space-y-4">
                        <textarea
                          value={editedValues.mission || ''}
                          onChange={(e) => setEditedValues({...editedValues, mission: e.target.value})}
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          rows={4}
                          placeholder="Describe your company mission..."
                          style={{fontFamily: 'Poppins'}}
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setPendingApproval(true);
                              setEditingSection(null);
                              setShowApprovalNotification(true);
                              setTimeout(() => setShowApprovalNotification(false), 5000);
                            }}
                            className="bg-pink-600 hover:bg-pink-700 text-white"
                            style={{fontFamily: 'Sora'}}
                          >
                            Submit for Approval
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setEditingSection(null)}
                            style={{fontFamily: 'Sora'}}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 leading-relaxed" style={{fontFamily: 'Poppins'}}>
                          To empower brands through innovative creative solutions that drive meaningful connections and deliver exceptional results for our clients.
                        </p>
                        {statusInfo?.type === 'live' && (
                          <p className="text-xs text-gray-500 mt-2 italic" style={{fontFamily: 'Poppins'}}>
                            Changes will require approval before going live
                          </p>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Our Culture - Moved below Mission */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle style={{fontFamily: 'Sora'}}>Our Culture</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingSection('culture');
                        setEditedValues({ culture: employerProfile?.workEnvironment || '' });
                      }}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-1 text-sm">Edit</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {editingSection === 'culture' ? (
                      <div className="space-y-4">
                        <textarea
                          value={editedValues.culture || ''}
                          onChange={(e) => setEditedValues({...editedValues, culture: e.target.value})}
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          rows={4}
                          placeholder="Describe your company culture..."
                          style={{fontFamily: 'Poppins'}}
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setPendingApproval(true);
                              setEditingSection(null);
                              setShowApprovalNotification(true);
                              setTimeout(() => setShowApprovalNotification(false), 5000);
                            }}
                            className="bg-pink-600 hover:bg-pink-700 text-white"
                            style={{fontFamily: 'Sora'}}
                          >
                            Submit for Approval
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setEditingSection(null)}
                            style={{fontFamily: 'Sora'}}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 leading-relaxed" style={{fontFamily: 'Poppins'}}>
                          {employerProfile.workEnvironment || "We foster a collaborative, creative environment where every team member can thrive and grow their skills."}
                        </p>
                        {statusInfo?.type === 'live' && (
                          <p className="text-xs text-gray-500 mt-2 italic" style={{fontFamily: 'Poppins'}}>
                            Changes will require approval before going live
                          </p>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Diversity & Inclusion */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle style={{fontFamily: 'Sora'}}>Diversity & Inclusion</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingSection('diversity');
                        setEditedValues({ diversity: employerProfile?.description || '' });
                      }}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-1 text-sm">Edit</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {editingSection === 'diversity' ? (
                      <div className="space-y-4">
                        <textarea
                          value={editedValues.diversity || 'We\'re committed to building a diverse team that reflects the communities we serve. We actively encourage applications from underrepresented groups and provide equal opportunities for career growth.'}
                          onChange={(e) => setEditedValues({...editedValues, diversity: e.target.value})}
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                          rows={4}
                          placeholder="Describe your diversity & inclusion commitment..."
                          style={{fontFamily: 'Poppins'}}
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setPendingApproval(true);
                              setEditingSection(null);
                              setShowApprovalNotification(true);
                              setTimeout(() => setShowApprovalNotification(false), 5000);
                            }}
                            className="bg-pink-600 hover:bg-pink-700 text-white"
                            style={{fontFamily: 'Sora'}}
                          >
                            Submit for Approval
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setEditingSection(null)}
                            style={{fontFamily: 'Sora'}}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 leading-relaxed" style={{fontFamily: 'Poppins'}}>
                          We're committed to building a diverse team that reflects the communities we serve. We actively encourage applications from underrepresented groups and provide equal opportunities for career growth.
                        </p>
                        {statusInfo?.type === 'live' && (
                          <p className="text-xs text-gray-500 mt-2 italic" style={{fontFamily: 'Poppins'}}>
                            Changes will require approval before going live
                        </p>
                          )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Company Values */}
                {employerProfile.values && employerProfile.values.length > 0 && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle style={{fontFamily: 'Sora'}}>Our Values</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setEditingSection('values');
                          setEditedValues({ values: employerProfile?.values?.join(', ') || '' });
                        }}
                        className="hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="ml-1 text-sm">Edit</span>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {editingSection === 'values' ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editedValues.values || ''}
                            onChange={(e) => setEditedValues({...editedValues, values: e.target.value})}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter values separated by commas (e.g. Innovation, Collaboration, Excellence)"
                            style={{fontFamily: 'Poppins'}}
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => {
                                setPendingApproval(true);
                                setEditingSection(null);
                                setShowApprovalNotification(true);
                                setTimeout(() => setShowApprovalNotification(false), 5000);
                              }}
                              className="bg-pink-600 hover:bg-pink-700 text-white"
                              style={{fontFamily: 'Sora'}}
                            >
                              Submit for Approval
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setEditingSection(null)}
                              style={{fontFamily: 'Sora'}}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2">
                            {employerProfile.values.map((value, index) => (
                              <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {value}
                              </Badge>
                            ))}
                          </div>
                          {statusInfo?.type === 'live' && (
                            <p className="text-xs text-gray-500 mt-2 italic" style={{fontFamily: 'Poppins'}}>
                              Changes will require approval before going live
                            </p>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Benefits & Perks */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle style={{fontFamily: 'Sora'}}>What We Offer</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setEditingSection('benefits');
                        setEditedValues({
                          benefits: employerProfile?.benefits?.join('\n') || 'Comprehensive health insurance\nFlexible working arrangements\nProfessional development budget (£2,000 annually)\n25 days annual leave plus bank holidays\nPension scheme with company contribution\nWellness programme including mental health support\nHome office setup allowance\nSeason ticket loan',
                          perks: employerProfile?.perks?.join('\n') || 'Wellness programme including mental health support\nHome office setup allowance\nSeason ticket loan\nFree snacks and drinks'
                        });
                      }}
                      className="hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="ml-1 text-sm">Edit</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editingSection === 'benefits' ? (
                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                            <textarea
                              value={editedValues.benefits || 'Comprehensive health insurance\nFlexible working arrangements\nProfessional development budget (£2,000 annually)\n25 days annual leave plus bank holidays'}
                              onChange={(e) => setEditedValues({...editedValues, benefits: e.target.value})}
                              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              rows={4}
                              placeholder="List your benefits, one per line..."
                              style={{fontFamily: 'Poppins'}}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Perks</label>
                            <textarea
                              value={editedValues.perks || 'Wellness programme including mental health support\nHome office setup allowance\nSeason ticket loan\nFree snacks and drinks'}
                              onChange={(e) => setEditedValues({...editedValues, perks: e.target.value})}
                              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                              rows={4}
                              placeholder="List your perks, one per line..."
                              style={{fontFamily: 'Poppins'}}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setPendingApproval(true);
                              setEditingSection(null);
                              setShowApprovalNotification(true);
                              setTimeout(() => setShowApprovalNotification(false), 5000);
                            }}
                            className="bg-pink-600 hover:bg-pink-700 text-white"
                            style={{fontFamily: 'Sora'}}
                          >
                            Submit for Approval
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setEditingSection(null)}
                            style={{fontFamily: 'Sora'}}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (null
                    )}
                  </CardContent>
                </Card>
                


              </div>
            </div>
          </TabsContent>
                </div>
                </Tabs>
                </div>
                </Card>
                </div>
)}
                      
>>>>>>> 35e2bf7d81309a08ac7761b9ee75f559bb23883b
