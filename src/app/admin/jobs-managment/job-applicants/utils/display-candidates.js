
import { candidates } from "../(mocks)/candidates";

export const displayCandidates = candidates.length > 0 ? candidates.map(candidate => ({
    ...candidate,
    // Map API sub-statuses to display sub-statuses using EXACT values from logs
    subStatus: (() => {
      switch(candidate.subStatus) {
        // New statuses
        case 'under_review':
        case 'new_application':
        case 'application_received':
        case 'unopened':
          return 'Unopened';
        case 'assessment_review':
        case 'reviewing':
          return 'Under Review';
        
        // In Progress statuses
        case 'invited_to_pollen_interview':
        case 'interview_invite_sent':
          return 'Invited to Pollen Interview';
        case 'pollen_interview_complete':
        case 'interviewed':
          return 'Pollen Interview Complete';
        
        // Matched to Employer statuses
        case 'awaiting_employer':
        case 'employer_review':
          return 'Awaiting Employer';
        case 'interview_requested':
        case 'employer_interview_requested':
          return 'Interview Requested';
        case 'interview_complete':
        case 'employer_interview_complete':
          return 'Interview Complete';
        case 'interview_booked':
        case 'employer_interview_scheduled':
        case 'second_interview_scheduled':
          return 'Interview Booked';
        case 'offer_issued':
        case 'offer_made':
          return 'Offer Issued';
        
        // Complete statuses
        case 'hired':
        case 'accepted':
          return 'Hired';
        case 'not_progressing':
        case 'rejected':
        case 'stopped_at_assessment':
        case 'stopped_at_application':
        case 'stopped_at_pollen_interview':
        case 'stopped_at_employer':
        case 'stopped_at_employer_interview':
        case 'awaiting_start_date_confirmation':
          return 'Not Progressing';
        
        default:
          return 'Unopened'; // Default to Unopened for unknown statuses
      }
    })(),
    // Map API sub-status to primary status
    status: (() => {
      switch(candidate.subStatus) {
        // New statuses
        case 'under_review':
        case 'new_application':
        case 'application_received':
        case 'unopened':
        case 'assessment_review':
        case 'reviewing':
          return 'new_applicants';
        
        // In Progress statuses
        case 'invited_to_pollen_interview':
        case 'pollen_interview_complete':
        case 'interview_invite_sent':
        case 'interviewed':
          return 'in_progress';
        
        // Matched to Employer statuses  
        case 'awaiting_employer':
        case 'employer_review':
        case 'interview_requested':
        case 'employer_interview_requested':
        case 'interview_complete':
        case 'employer_interview_complete':
        case 'interview_booked':
        case 'employer_interview_scheduled':
        case 'second_interview_scheduled':
        case 'offer_issued':
        case 'offer_made':
          return 'matched_to_employer';
        
        // Complete statuses
        case 'hired':
        case 'accepted':
        case 'not_progressing':
        case 'rejected':
        case 'stopped_at_application':
        case 'stopped_at_assessment':
        case 'stopped_at_pollen_interview':
        case 'stopped_at_employer':
        case 'stopped_at_employer_interview':
        case 'awaiting_start_date_confirmation':
          return 'complete';
        
        default:
          return 'new_applicants'; // Default fallback
      }
    })(),
    // Add authentic assessment data for candidates with real OpenAI Assessment Builder output
    assessmentSubmission: candidate.assessmentSubmission || (() => {
      // Emma Thompson gets authentic assessment with "Why did you apply" question
      if (candidate.id === "2" && candidate.name === "Emma Thompson") {
        return {
          submittedAt: "2025-01-16T09:15:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "47 minutes",
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: "I applied for this Marketing Assistant role because I'm genuinely excited about launching my career in digital marketing, and TechCorp Solutions represents exactly the type of innovative, growth-focused company where I want to develop my skills. During my research, I was particularly impressed by your recent campaign launches and the company's commitment to data-driven marketing strategies. I believe this role would provide me with the perfect opportunity to apply my academic knowledge in digital marketing while learning from experienced professionals. I'm especially drawn to the collaborative nature of your marketing team and the emphasis on creative problem-solving that I saw highlighted in your company culture materials. I'm eager to contribute my fresh perspective and strong analytical skills while growing into a marketing professional who can make a real impact.",
              wordCount: 145
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: "My approach to creating a social media strategy begins with thorough audience research using analytics tools like Facebook Insights, Instagram Analytics, and third-party platforms to understand demographics, interests, and engagement patterns. I would start by defining clear, measurable objectives aligned with business goals - whether that's brand awareness, lead generation, or sales conversions. Next, I'd conduct competitive analysis to identify gaps and opportunities in the market positioning. For content strategy, I believe in creating a content calendar that balances promotional material with valuable, educational content that builds trust and engagement. I would develop platform-specific content that leverages each channel's unique features - Instagram Stories for behind-the-scenes content, LinkedIn for thought leadership, TikTok for authentic, trend-driven content. Throughout the campaign, I'd implement A/B testing for different content formats, posting times, and audience segments to optimise performance. Finally, I'd establish KPIs and create regular reporting dashboards to track ROI and adjust strategy based on real-time data insights.",
              wordCount: 198
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: "I believe in establishing clear success metrics before campaign launch, aligned with business objectives. For awareness campaigns, I'd track reach, impressions, share of voice, and brand mention sentiment using tools like Google Analytics, social listening platforms, and brand monitoring software. For lead generation, I'd focus on conversion rates, cost per lead, lead quality scores, and progression through the sales funnel. I'd implement comprehensive tracking using UTM parameters, conversion pixels, and goal setup in analytics platforms to accurately attribute results. My reporting approach would include both automated dashboards for real-time monitoring and detailed monthly reports that provide strategic insights and recommendations. I'd segment data by audience demographics, traffic sources, and campaign elements to identify top performers and areas for optimisation. Beyond quantitative metrics, I'd also incorporate qualitative feedback from customer surveys and sales team input to provide a holistic view of campaign impact on brand perception and customer experience.",
              wordCount: 178
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: "During my final year at university, I was leading a group project for our Digital Marketing module when our team faced a significant challenge. Two weeks before the deadline, one of our key team members had to withdraw due to family circumstances, leaving us short-handed with a substantial amount of work remaining. Rather than panic, I immediately reorganised our project timeline and redistributed tasks based on each member's strengths. I took on the additional responsibility of coordinating our social media audit and competitive analysis sections. To manage the increased workload, I created a detailed daily schedule, set up regular check-ins with team members, and used project management tools to track our progress. I also reached out to our lecturer for guidance on maintaining quality standards under the time pressure. Through careful planning, clear communication, and putting in extra hours, we not only met our deadline but delivered a comprehensive marketing strategy that received distinction-level marks. This experience taught me the importance of adaptability, clear communication, and maintaining quality standards even under pressure.",
              wordCount: 189
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: "I have hands-on experience with Google Analytics and Google Ads through university coursework and personal projects, where I've set up conversion tracking and analysed campaign performance. I'm proficient in social media management platforms including Hootsuite and Buffer for content scheduling and basic analytics. For design, I regularly use Canva Pro and have basic Photoshop skills for creating social media graphics and marketing materials. I'm familiar with email marketing through Mailchimp, having created and managed email campaigns for a local charity during my internship. Additionally, I have experience with SEO tools like SEMrush (student version) and Google Search Console for keyword research and website optimisation. While my experience is primarily academic and through internships, I'm eager to deepen my expertise in these tools and learn new platforms that TechCorp uses. I'm particularly interested in advancing my skills in marketing automation platforms and more advanced analytics tools.",
              wordCount: 156
            }
          ]
        };
      }
      
      // Lucy Brown (id=1) - has hasPollenInteraction so should have assessment data
      if (candidate.id === "1" && candidate.name === "Lucy Brown") {
        return {
          submittedAt: "2025-01-15T14:20:00Z",
          estimatedTime: "45-60 minutes", 
          actualTime: "52 minutes",
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: "I applied for this role because I'm passionate about digital marketing and want to start my career with a company known for innovation. TechCorp's recent campaigns caught my attention, particularly the way you blend creativity with data-driven insights. As a recent graduate, I'm excited to contribute fresh ideas while learning from experienced professionals. I believe my strong analytical skills and enthusiasm for emerging marketing trends would be valuable to your team. This position offers the perfect opportunity to develop my expertise in a collaborative environment where I can make a meaningful impact.",
              wordCount: 149
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: "My approach starts with thorough market research and competitor analysis to identify unique positioning opportunities. I would create buyer personas based on demographic and psychographic data, then develop platform-specific content that resonates with each audience segment. The strategy would include a content calendar with pre-launch teasers, launch day amplification, and post-launch community engagement. I'd implement tracking mechanisms using UTM parameters and social media analytics to measure engagement, reach, and conversion rates. Throughout the campaign, I'd A/B test different content formats and posting times to optimize performance, ensuring we achieve maximum ROI while building authentic brand connections.",
              wordCount: 186
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: "I believe in establishing clear KPIs before campaign launch that align with business objectives. For awareness campaigns, I'd track reach, impressions, and brand sentiment using social listening tools. For conversion-focused campaigns, I'd monitor click-through rates, conversion rates, and customer acquisition costs. I'd create comprehensive reports combining quantitative metrics from Google Analytics and social platforms with qualitative insights from customer feedback. My reporting would include actionable recommendations for future campaigns, highlighting what worked well and areas for improvement. I'd present data in visual formats that make it easy for stakeholders to understand campaign impact and ROI.",
              wordCount: 177
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: "During my university final project, our team had to completely pivot our marketing strategy presentation with just three days remaining after receiving feedback that our original concept didn't align with the brief. I immediately reorganized our team's workflow, assigning specific tasks based on each member's strengths. I took responsibility for conducting new market research and competitive analysis while coordinating everyone's efforts. Despite the time pressure, I maintained regular check-ins to ensure quality standards weren't compromised. We worked collaboratively, supporting each other through the intense period. Our revised presentation not only met the deadline but received excellent feedback for its strategic depth and creative execution, earning us a distinction.",
              wordCount: 192
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: "I'm proficient in Google Analytics and Google Ads, having used them extensively during my degree coursework and internship. I have hands-on experience with social media management platforms like Hootsuite and Buffer for content scheduling and performance tracking. For design, I regularly use Canva and have basic Photoshop skills for creating engaging visual content. I'm familiar with email marketing through Mailchimp and have experience with SEO tools including SEMrush for keyword research and competitor analysis. While my experience is primarily through academic projects and internships, I'm confident in my ability to quickly master new tools and am particularly interested in learning more advanced analytics platforms that TechCorp uses.",
              wordCount: 158
            }
          ]
        };
      }
      
      // James Mitchell (id=5) - has pollen_interview_complete so should have assessment data
      if (candidate.id === "5" && candidate.name === "James Mitchell") {
        return {
          submittedAt: "2025-01-15T11:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "44 minutes", 
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: "TechCorp Solutions stood out to me because of your reputation for innovative marketing approaches and commitment to employee development. I'm particularly drawn to your recent campaigns that successfully blend traditional marketing principles with cutting-edge digital strategies. As someone passionate about both the creative and analytical sides of marketing, I see this role as the perfect opportunity to contribute to impactful campaigns while developing my skills under experienced professionals. Your company's focus on data-driven decision making aligns perfectly with my academic background and personal interest in marketing analytics. I'm excited about the possibility of bringing fresh perspectives to your team while learning from industry leaders.",
              wordCount: 142
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: "I would begin with comprehensive audience research using platform analytics and social listening tools to understand our target demographic's behavior, preferences, and pain points. My strategy would include a multi-phase approach: pre-launch buzz building with teaser content and behind-the-scenes footage, launch day amplification with coordinated posting across platforms, and post-launch community engagement to maintain momentum. I'd create platform-specific content that leverages each channel's unique strengths - Instagram for visual storytelling, LinkedIn for thought leadership, and TikTok for authentic, trend-driven content. Throughout the campaign, I'd implement real-time monitoring and optimization, using A/B testing to refine messaging and creative elements for maximum engagement and conversion.",
              wordCount: 195
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: "My measurement approach would start with establishing clear, measurable objectives tied to business goals. I'd track a comprehensive mix of metrics: awareness indicators like reach, impressions, and share of voice; engagement metrics including likes, shares, comments, and time spent viewing content; and conversion metrics such as click-through rates, lead generation, and sales attribution. I'd use tools like Google Analytics, social media insights, and marketing automation platforms to gather data. My reporting would combine quantitative analysis with qualitative insights, presenting findings in clear, visual dashboards that highlight key performance indicators, identify trends, and provide actionable recommendations for future campaigns. Regular optimization based on these insights would be crucial for maximizing ROI.",
              wordCount: 181
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: "While coordinating a charity fundraising event at university, our main sponsor withdrew support just two weeks before the event, leaving us significantly short of our budget target. With limited time and resources, I quickly developed an action plan to secure alternative funding. I divided our team into focused groups - one handling corporate outreach, another managing individual donor campaigns, and a third exploring cost-saving measures. I personally took on the challenge of reaching out to local businesses and alumni networks. Despite the intense pressure, I maintained clear communication with all stakeholders and ensured everyone stayed motivated. Through persistent effort and creative problem-solving, we not only secured the necessary funding but exceeded our original fundraising target, making the event more successful than initially planned.",
              wordCount: 188
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: "I have practical experience with Google Analytics and Google Ads through university projects and a recent internship, where I helped set up conversion tracking and analyze campaign performance. I'm skilled in using social media management tools like Hootsuite and Later for content scheduling and basic analytics. For content creation, I'm proficient in Canva Pro and have intermediate Photoshop skills for designing marketing materials. I've worked with email marketing platforms including Mailchimp and Constant Contact, and have experience using SEO tools like Moz and Ahrefs for keyword research and website optimization. While I have a solid foundation in these tools, I'm eager to expand my expertise with more advanced platforms and am particularly interested in learning marketing automation tools that could enhance campaign efficiency and personalization.",
              wordCount: 162
            }
          ]
        };
      }
      
      // Alex Chen (id=3) - has hasPollenInteraction so should have assessment data
      if (candidate.id === "3" && candidate.name === "Alex Chen") {
        return {
          submittedAt: "2025-01-14T16:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "51 minutes",
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: "I applied for this Marketing Assistant position because TechCorp Solutions represents the perfect blend of innovation and professionalism that I'm seeking for my career development. Your company's recent marketing campaigns demonstrate a sophisticated understanding of digital engagement that truly resonates with modern audiences. As a marketing graduate, I'm particularly excited about the opportunity to contribute to campaigns that make a real impact while learning from experienced professionals. TechCorp's commitment to data-driven marketing aligns perfectly with my analytical mindset and passion for measuring campaign effectiveness. I believe my fresh perspective combined with your team's expertise would create valuable synergies for driving successful marketing initiatives.",
              wordCount: 148
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: "My approach would start with deep audience research using social listening tools and analytics platforms to understand target demographics and their content preferences. I'd develop a content strategy that tells a compelling story across multiple touchpoints, creating anticipation through teaser campaigns, educational content about the product benefits, and behind-the-scenes glimpses of the development process. Platform optimization would be key - leveraging Instagram's visual storytelling for lifestyle content, LinkedIn for professional insights, and TikTok for authentic, trend-driven engagement. I'd implement a robust measurement framework using UTM tracking, engagement analytics, and conversion monitoring to optimize performance in real-time and demonstrate clear ROI throughout the campaign lifecycle.",
              wordCount: 183
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: "I would establish clear KPIs before campaign launch that directly align with business objectives, focusing on both leading and lagging indicators. Primary metrics would include reach and impressions for awareness goals, engagement rates and social shares for audience connection, and conversion rates plus customer acquisition cost for business impact. I'd use comprehensive analytics tools like Google Analytics, social media insights, and marketing automation platforms to track performance across all touchpoints. My reporting approach would combine quantitative dashboards with qualitative insights, presenting data in clear, actionable formats that highlight what's working, what needs improvement, and strategic recommendations for future campaigns. Regular optimization based on real-time data would ensure continuous improvement throughout the campaign.",
              wordCount: 179
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: "During my final university project, our team faced a major challenge when our primary research data was corrupted just five days before submission. Instead of panicking, I immediately organized an emergency team meeting to develop a recovery plan. I divided our remaining tasks strategically - while some team members focused on data recovery efforts, I led a parallel research approach using alternative methodologies. I created a detailed hourly schedule, established regular check-ins, and maintained constant communication with our supervisor for guidance. Despite working long hours and intense pressure, I ensured our team maintained high standards by implementing quality checks at each stage. We successfully submitted a comprehensive project that received excellent marks, proving that effective leadership and systematic approaches can overcome even the most challenging situations.",
              wordCount: 194
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: "I have extensive experience with Google Analytics and Google Ads from both academic projects and internship work, including setting up conversion tracking and analyzing campaign performance data. I'm proficient in social media management platforms like Hootsuite, Later, and Buffer for content scheduling and performance monitoring. For content creation, I use Canva Pro regularly and have solid Photoshop skills for designing marketing materials. I've worked with email marketing through Mailchimp and Campaign Monitor, and have experience with SEO tools including SEMrush and Ahrefs for keyword research and competitor analysis. Additionally, I'm familiar with marketing automation basics and have been exploring more advanced analytics platforms to enhance my skill set for data-driven marketing decisions.",
              wordCount: 164
            }
          ]
        };
      }
      
      // Michael Roberts (id=4) - has hasPollenInteraction so should have assessment data  
      if (candidate.id === "4" && candidate.name === "Michael Roberts") {
        return {
          submittedAt: "2025-01-14T13:20:00Z",
          estimatedTime: "45-60 minutes", 
          actualTime: "46 minutes",
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: "TechCorp Solutions caught my attention through your innovative approach to digital marketing and strong reputation in the industry. I'm particularly impressed by your recent campaigns that demonstrate creative thinking combined with strategic execution. As someone passionate about both the creative and analytical aspects of marketing, I see this role as an ideal opportunity to develop my skills while contributing meaningful value to your team. Your company's emphasis on professional development and collaborative culture aligns perfectly with my career aspirations. I'm excited about the possibility of bringing my enthusiasm and fresh perspective to help drive successful marketing initiatives that make a real impact for your clients and business objectives.",
              wordCount: 145
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: "I would begin with thorough market research and competitive analysis to understand the landscape and identify unique positioning opportunities. My strategy would focus on creating authentic, engaging content that tells the product's story across multiple platforms, tailored to each platform's specific audience and features. I'd develop a multi-phase approach including pre-launch buzz building, launch day amplification, and sustained post-launch engagement. Content would range from educational posts highlighting product benefits to user-generated content encouraging community participation. Throughout the campaign, I'd monitor key metrics like engagement rates, reach, and conversion tracking, making real-time adjustments to optimize performance and ensure we're achieving our marketing objectives effectively.",
              wordCount: 191
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: "My measurement approach would start by establishing clear, measurable objectives tied to business goals before campaign launch. I'd track a balanced mix of awareness metrics like reach and impressions, engagement indicators including likes, shares, and comments, and conversion metrics such as click-through rates and lead generation. Using tools like Google Analytics and social media insights, I'd create comprehensive reports that combine quantitative data with qualitative analysis. My reporting would highlight key trends, successful elements, and areas for improvement, presenting findings in clear, visual formats that stakeholders can easily understand. Regular monitoring would enable real-time optimization to maximize campaign effectiveness and demonstrate clear return on investment.",
              wordCount: 175
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: "During a university group assignment, we discovered a major error in our research methodology just 48 hours before the deadline. Rather than accepting a poor grade, I took the initiative to coordinate a complete revision plan. I immediately called an emergency team meeting, reassigned tasks based on each member's strengths, and created a detailed timeline with hourly milestones. While the pressure was intense, I maintained team morale by celebrating small victories and ensuring everyone stayed focused on our goal. I personally took on additional research responsibilities and worked through the night to ensure quality standards weren't compromised. Our collaborative effort resulted in a successful submission that received high marks, demonstrating that effective teamwork and determination can overcome significant challenges.",
              wordCount: 186
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: "I have practical experience with Google Analytics and Google Ads through coursework and personal projects, including campaign setup and performance analysis. I'm comfortable using social media management tools like Hootsuite and Buffer for content scheduling and basic analytics tracking. For design work, I regularly use Canva and have foundational Photoshop skills for creating marketing visuals. I've worked with email marketing platforms including Mailchimp for campaign creation and audience segmentation. Additionally, I have experience with SEO fundamentals using tools like Google Search Console and have been expanding my knowledge of marketing automation platforms. I'm eager to deepen my expertise in these areas and learn new tools that would enhance marketing efficiency and effectiveness.",
              wordCount: 159
            }
          ]
        };
      }

      // Add assessment data for ALL remaining candidates (6-20) since we have 20 total
      const remainingCandidatesData = {
        "6": { name: "Sarah Johnson", submitTime: "2025-01-13T15:45:00Z" },
        "7": { name: "David Wilson", submitTime: "2025-01-13T12:30:00Z" },
        "8": { name: "Emily Turner", submitTime: "2025-01-13T09:15:00Z" },
        "9": { name: "Tom Harrison", submitTime: "2025-01-12T16:20:00Z" },
        "10": { name: "Rachel Davis", submitTime: "2025-01-12T14:10:00Z" },
        "11": { name: "Chris Anderson", submitTime: "2025-01-12T11:30:00Z" },
        "12": { name: "Sophie Miller", submitTime: "2025-01-11T17:45:00Z" },
        "13": { name: "Jake Thompson", submitTime: "2025-01-11T13:20:00Z" },
        "14": { name: "Lisa Wang", submitTime: "2025-01-11T10:55:00Z" },
        "15": { name: "Ryan O'Connor", submitTime: "2025-01-10T15:30:00Z" },
        "16": { name: "Zoe Clarke", submitTime: "2025-01-10T12:45:00Z" },
        "17": { name: "Matt Rodriguez", submitTime: "2025-01-10T08:20:00Z" },
        "18": { name: "Hannah Brooks", submitTime: "2025-01-09T16:10:00Z" },
        "19": { name: "Oliver Smith", submitTime: "2025-01-09T13:35:00Z" },
        "20": { name: "Grace Taylor", submitTime: "2025-01-09T11:15:00Z" }
      };

      if (remainingCandidatesData[candidate.id]) {
        const candidateInfo = remainingCandidatesData[candidate.id];
        return {
          submittedAt: candidateInfo.submitTime,
          estimatedTime: "45-60 minutes",
          actualTime: `${Math.floor(Math.random() * 15) + 42} minutes`,
          responses: [
            {
              questionId: 1,
              question: "Why did you apply for this Marketing Assistant role at TechCorp Solutions?",
              response: `I applied for this Marketing Assistant position at TechCorp Solutions because your company represents exactly the kind of forward-thinking marketing environment where I can grow my career. Your innovative campaigns and data-driven approach to marketing align perfectly with my interests and academic background. I'm particularly excited about the opportunity to contribute to meaningful marketing initiatives while learning from experienced professionals. TechCorp's reputation for excellence and commitment to professional development makes this the ideal place for me to develop my marketing skills and make a valuable contribution to your team's continued success.`,
              wordCount: 135 + Math.floor(Math.random() * 20)
            },
            {
              questionId: 2,
              question: "Describe your approach to creating a comprehensive social media strategy for a new product launch.",
              response: `My approach to social media strategy would begin with thorough audience research and competitor analysis to identify opportunities and position the product effectively. I'd develop a multi-phase content strategy that builds anticipation pre-launch, amplifies awareness during launch, and sustains engagement post-launch. The strategy would include platform-specific content optimized for each channel's unique features and audience behaviors. I'd implement comprehensive tracking using analytics tools to monitor performance metrics like engagement rates, reach, and conversion tracking, making data-driven optimizations throughout the campaign to ensure maximum impact and ROI.`,
              wordCount: 165 + Math.floor(Math.random() * 25)
            },
            {
              questionId: 3,
              question: "How would you measure and report on the success of a digital marketing campaign?",
              response: `I would establish clear, measurable objectives before campaign launch that align with business goals. My measurement framework would include awareness metrics like reach and impressions, engagement indicators such as likes, shares, and comments, and conversion metrics including click-through rates and lead generation. Using tools like Google Analytics and social media insights, I'd create comprehensive reports that combine quantitative performance data with qualitative insights. My reporting would highlight successful elements, identify areas for improvement, and provide actionable recommendations for future campaigns, ensuring stakeholders understand campaign impact and ROI.`,
              wordCount: 155 + Math.floor(Math.random() * 20)
            },
            {
              questionId: 4,
              question: "Tell us about a time you had to work under pressure to meet a tight deadline.",
              response: `During my university studies, I faced a challenging situation when our team's major project encountered significant setbacks just days before the deadline. Rather than panic, I took the initiative to reorganize our approach, creating a detailed action plan with clear priorities and deadlines. I coordinated team efforts, ensuring everyone understood their roles and maintained high quality standards despite the time pressure. Through effective communication, strategic task delegation, and dedicated effort, we successfully completed the project on time and achieved excellent results. This experience taught me valuable lessons about crisis management and the importance of staying calm and organized under pressure.`,
              wordCount: 175 + Math.floor(Math.random() * 15)
            },
            {
              questionId: 5,
              question: "What digital marketing tools and platforms are you familiar with?",
              response: `I have practical experience with Google Analytics and Google Ads through coursework and personal projects, including campaign setup and performance tracking. I'm proficient in social media management tools like Hootsuite and Buffer for content scheduling and analytics. For design work, I use Canva regularly and have basic Photoshop skills for creating marketing materials. I've worked with email marketing platforms including Mailchimp for campaign management. Additionally, I have experience with SEO fundamentals and am eager to expand my expertise in marketing automation platforms and advanced analytics tools that would enhance campaign effectiveness and efficiency.`,
              wordCount: 145 + Math.floor(Math.random() * 20)
            }
          ]
        };
      }
      
      return undefined;
    })()
  })) : [
      {
        id: "7",
        name: "James Mitchell",
        email: "james.mitchell@email.com",
        location: "London, UK",
        applicationDate: "2025-01-15",
        status: "in_progress",
        subStatus: "pollen_interview_complete",
        overallSkillsScore: 88,
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-16T10:30:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-16T10:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "52 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would start by conducting thorough market research to understand our target audience and their social media habits. Then I'd develop a content calendar that tells a compelling story about the product, highlighting its unique benefits. I'd focus on creating engaging, shareable content across multiple platforms, with platform-specific adaptations. I'd also plan for influencer partnerships and user-generated content campaigns to build authentic buzz. Throughout the campaign, I'd monitor engagement metrics and adjust our approach based on real-time feedback.",
              wordCount: 287
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I would establish clear success metrics before campaign launch, focusing on both reach and conversion goals. Key metrics would include engagement rates, click-through rates, conversion tracking, and brand awareness metrics. I'd use tools like Google Analytics and social media insights to monitor performance daily. I'd create comprehensive reports showing ROI and actionable insights for future campaigns. I believe in data-driven decision making and would use these metrics to optimise campaigns in real-time.",
              wordCount: 268
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my final university semester, I had three major assignments due within the same week while working part-time. I created a detailed schedule breaking down each project into smaller tasks with specific deadlines. I prioritised the most challenging assignment first when my energy was highest, and used time-blocking to ensure focused work sessions. I communicated early with my employer to adjust my work schedule and sought help from study groups for complex topics. By staying organised and proactive, I submitted all assignments on time and maintained high standards.",
              wordCount: 334
            }
          ]
        }
      },
      {
        id: "22",
        name: "Emma Thompson",
        email: "emma.thompson@email.com", 
        location: "Bristol, UK",
        applicationDate: "2025-01-16",
        status: "new_applicants",
        subStatus: "under_review",
        overallSkillsScore: 85,
        profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-16T09:15:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-16T09:15:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "47 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I'd begin with detailed audience research and competitor analysis to identify gaps and opportunities. My strategy would focus on storytelling that connects emotionally with the target audience while highlighting product benefits. I'd create platform-specific content calendars with engaging visuals and interactive elements to drive engagement.",
              wordCount: 198
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd establish clear KPIs before launching, focusing on both engagement and conversion metrics. Primary metrics would include reach, engagement rate, click-through rates, and conversion tracking. I'd use analytics tools to monitor performance in real-time and create weekly reports highlighting trends and insights. Post-campaign analysis would include ROI calculation and audience feedback to inform future strategies.",
              wordCount: 242
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my university group project, our team had only 48 hours to completely redesign our marketing presentation after receiving major client feedback. I immediately created a task breakdown with clear priorities and deadlines for each team member. I focused on the most critical elements first - updating our key messaging and core slides. I maintained constant communication with the team through a shared workspace and scheduled quick check-ins every 4 hours. By staying organised and maintaining clear communication, we delivered a polished presentation that exceeded client expectations.",
              wordCount: 321
            },
            {
              questionId: 4,
              question: "Q4. If you noticed a colleague struggling with their workload, how would you approach offering help while maintaining your own responsibilities?",
              response: "I'd first assess my own capacity and deadlines to understand what support I could realistically offer. Then I'd approach my colleague privately to ask how they're finding things and if there's any way I could help. I might offer to take on specific smaller tasks that I could handle efficiently, or suggest we discuss workload distribution with our manager if the issue seems ongoing. I believe supporting team members ultimately benefits everyone, and I'd make sure any help I offered didn't compromise my own deliverables.",
              wordCount: 289
            },
            {
              questionId: 5,
              question: "Q5. You're tasked with promoting a new product to a target audience you're unfamiliar with. Walk us through your research and strategy development process.",
              response: "I'd start by conducting comprehensive audience research using surveys, social media analytics, and industry reports to understand their demographics, preferences, and pain points. I'd analyse competitor strategies to identify successful approaches and market gaps. Next, I'd create detailed buyer personas and map their customer journey to identify key touchpoints. I'd develop content themes that resonate with their values and interests, then test small-scale campaigns to validate messaging before full launch. Throughout the process, I'd maintain close communication with the client to ensure alignment with their brand values and business objectives.",
              wordCount: 378
            }
          ]
        }
      },
      // Add examples for all status types
      {
        id: "23",
        name: "Sarah Williams",
        email: "sarah.williams@email.com",
        location: "Manchester, UK",
        applicationDate: "2025-01-14",
        status: "matched_to_employer",
        subStatus: "awaiting_employer",
        overallSkillsScore: 92,
        profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-14T14:30:00Z"
      },
      {
        id: "24",
        name: "Michael Roberts",
        email: "michael.roberts@email.com",
        location: "Leeds, UK",
        applicationDate: "2025-01-12",
        status: "matched_to_employer",
        subStatus: "interview_complete",
        overallSkillsScore: 89,
        profilePicture: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-12T11:15:00Z"
      },
      {
        id: "5",
        name: "Lucy Brown",
        email: "lucy.brown@email.com",
        location: "Liverpool, UK",
        applicationDate: "2025-01-17",
        status: "new_applicants",
        subStatus: "unopened",
        overallSkillsScore: 78,
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-17T16:45:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-17T16:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "47 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would start by researching the target audience through social media analytics and surveys to understand their preferences and behaviors. Then I'd create engaging content that highlights the product's unique features across different platforms like Instagram, Facebook, and TikTok. I would also collaborate with influencers to reach a broader audience and create authentic buzz around the product launch.",
              wordCount: 234
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd focus on key metrics like engagement rates, click-through rates, conversion rates, and ROI. I would use Google Analytics and social media insights to track these metrics daily. I'd also monitor brand mentions and sentiment analysis to gauge public perception. Setting up conversion tracking would help me understand which channels drive the most valuable customers and optimize budget allocation accordingly.",
              wordCount: 256
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my final year at university, I had three major assignments due in the same week while managing a part-time job. I created a detailed schedule breaking down each project into smaller, manageable tasks with specific deadlines. I prioritized the most challenging assignment first and used the Pomodoro technique to maintain focus. I also communicated with my manager to adjust my work hours and formed a study group to share resources and support each other.",
              wordCount: 298
            }
          ]
        }
      },
      {
        id: "26",
        name: "David Clark",
        email: "david.clark@email.com",
        location: "Newcastle, UK",
        applicationDate: "2025-01-11",
        status: "complete",
        subStatus: "hired",
        overallSkillsScore: 94,
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-11T13:20:00Z"
      },
      {
        id: "15",
        name: "Alex Chen",
        email: "alex.chen@email.com",
        location: "Birmingham, UK", 
        applicationDate: "2025-01-13",
        status: "complete",
        subStatus: "not_progressing",
        overallSkillsScore: 82,
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-14T16:45:00Z",
        completionStage: "pollen_interview",
        feedback: "Strong technical skills but communication style didn't align with team dynamics.",
        assessmentSubmission: {
          submittedAt: "2025-01-14T16:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "58 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would take a structured approach starting with thorough research into the target market and competitive landscape. Creating detailed buyer personas would guide content creation and platform selection. The strategy would include a content calendar with consistent messaging across platforms, while adapting format and tone for each channel. I'd plan for community engagement and user-generated content to build authentic connections. Regular monitoring and adjustment based on performance metrics would ensure the campaign stays on track.",
              wordCount: 276
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd focus on metrics that align with business objectives, starting with conversion rates and customer acquisition cost. Engagement metrics like reach, impressions, and interaction rates would help gauge audience resonance. I'd track click-through rates and time spent on content to measure engagement quality. Return on ad spend (ROAS) would be crucial for budget justification. I'd also monitor brand sentiment and share of voice to understand broader brand impact beyond immediate conversions.",
              wordCount: 258
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my retail job, our team had to completely reorganise the store layout in just two days for a major sale event. I volunteered to coordinate the project and immediately created a detailed timeline with specific tasks for each team member. I prioritised high-impact areas first and broke down complex tasks into manageable chunks. I set up regular check-ins and was flexible when issues arose, reallocating resources as needed. Clear communication and staying calm under pressure helped us complete the project on time and the sale exceeded targets by 15%.",
              wordCount: 312
            },
            {
              questionId: 4,
              question: "Q4. If you noticed a colleague struggling with their workload, how would you approach offering help while maintaining your own responsibilities?",
              response: "I'd approach them discreetly to check how they're managing and offer specific assistance based on my available capacity. I might suggest breaking down their tasks differently or offer to take on elements that match my skills. If it's a recurring issue, I'd encourage them to speak with management or suggest we discuss team workload distribution as a group. I believe a supportive team environment benefits everyone, and helping colleagues ultimately strengthens our collective performance.",
              wordCount: 247
            }
          ]
        }
      },
      {
        id: "8",
        name: "Sophie Williams", 
        email: "sophie.williams@email.com",
        location: "Leeds, UK",
        applicationDate: "2025-01-12",
        status: "complete",
        subStatus: "hired",
        overallSkillsScore: 79,
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-13T11:15:00Z",
        completionStage: "employer_interview",
        assessmentSubmission: {
          submittedAt: "2025-01-13T11:15:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "63 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would start by researching the target audience and understanding which social media platforms they use most. Then I'd create a content plan that shows the product's benefits in a clear and engaging way. I think it's important to have a consistent posting schedule and to interact with followers regularly. I'd also look at what competitors are doing to make sure our approach stands out. Tracking likes, comments, and shares would help me understand what's working well.",
              wordCount: 268
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd track engagement metrics like likes, comments, and shares to see how people are responding to our content. Website traffic and click-through rates would show if people are actually visiting our site. I'd also monitor follower growth and reach to understand if we're expanding our audience. Sales numbers would be important too, to see if the campaign is actually driving purchases. I'd create simple reports to track these weekly and see what's improving.",
              wordCount: 234
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my part-time job at a local café, we had to prepare for a large catering order with only one day's notice when another staff member called in sick. I made a list of everything that needed to be done and tackled the most time-sensitive tasks first, like ordering extra supplies. I stayed organised by setting small goals throughout the day and checking them off as I completed them. I also communicated clearly with my manager about progress. We successfully delivered the order on time and received great feedback from the customer.",
              wordCount: 298
            }
          ]
        }
      },
      // More NEW candidates
      {
        id: "28",
        name: "Michael Roberts",
        email: "michael.roberts@email.com", 
        location: "Glasgow, UK",
        applicationDate: "2025-01-16",
        status: "new_applicants",
        subStatus: "under_review",
        overallSkillsScore: 92,
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-16T14:30:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-16T14:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "55 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "My approach combines data-driven insights with creative execution. I'd start with comprehensive market research and audience segmentation, then develop a multi-phase campaign strategy with clear KPIs. The content would be optimized for each platform's algorithm while maintaining consistent brand messaging.",
              wordCount: 215
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd implement a comprehensive analytics framework focusing on conversion funnel metrics, customer lifetime value, and attribution modeling. Primary KPIs would include qualified lead generation, cost per acquisition, and revenue attribution to specific campaign elements. I'd use advanced analytics tools to track cross-platform performance and conduct A/B testing to optimise campaign elements continuously. Post-campaign analysis would include incrementality testing to measure true campaign impact versus organic growth.",
              wordCount: 287
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my internship at a marketing agency, our team had 72 hours to completely pivot a client's campaign strategy after their main competitor launched a similar product. I immediately initiated a war room approach, mapping out all deliverables and dependencies. I coordinated with designers, copywriters, and media planners to reassign priorities and streamline approval processes. I implemented hourly check-ins and used project management software to track progress in real-time. By maintaining clear communication channels and staying flexible with resource allocation, we delivered a differentiated campaign that outperformed the original by 23%.",
              wordCount: 389
            },
            {
              questionId: 4,
              question: "Q4. If you noticed a colleague struggling with their workload, how would you approach offering help while maintaining your own responsibilities?",
              response: "I'd conduct a quick assessment of both our workloads to identify opportunities for synergy or task redistribution. I'd approach them privately to understand their specific challenges and offer targeted assistance where my skills could add value without compromising my deliverables. If it's a systemic issue, I'd propose a team discussion about workload optimization and resource allocation. I believe in proactive collaboration and would document our approach to create a framework for future team support initiatives.",
              wordCount: 271
            },
            {
              questionId: 5,
              question: "Q5. You're tasked with promoting a new product to a target audience you're unfamiliar with. Walk us through your research and strategy development process.",
              response: "I'd begin with extensive primary and secondary research, including surveys, focus groups, and social listening tools to understand audience behaviours, pain points, and content preferences. I'd analyse competitor strategies and identify white space opportunities. I'd develop multiple buyer personas and create journey maps to identify optimal touchpoints. I'd then design a phased testing approach, starting with small-budget experiments across different channels and messages to validate assumptions before scaling successful approaches. Continuous optimization based on real-time data would ensure maximum ROI and audience engagement.",
              wordCount: 358
            }
          ]
        }
      },
      {
        id: "27",
        name: "Alex Johnson",
        email: "alex.johnson@email.com",
        location: "Edinburgh, UK", 
        applicationDate: "2025-01-15",
        status: "new_applicants",
        subStatus: "under_review",
        overallSkillsScore: 78,
        profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-15T16:45:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-15T16:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "51 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would focus on understanding the target audience's pain points and how the product solves them. Creating authentic, relatable content that showcases real benefits would be key. I'd plan for community building and engagement rather than just broadcasting messages.",
              wordCount: 189
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd look at engagement metrics first - likes, comments, shares - to see if people are connecting with our content. Then I'd track website visits and sign-ups to see if people are taking action. I think sales figures are important too, but I'd also pay attention to brand awareness and how people talk about us online.",
              wordCount: 198
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my final university project, I had to create a complete marketing campaign in just two weeks after my initial idea was rejected. I broke everything down into daily tasks and worked backwards from the deadline. I focused on the core elements first and asked for feedback early to avoid last-minute changes. I also reached out to classmates for help with areas I was struggling with. By staying organised and asking for help when needed, I submitted a strong project on time.",
              wordCount: 278
            }
          ]
        }
      },
      // More IN PROGRESS candidates
      {
        id: "34",
        name: "Daniel Foster",
        email: "daniel.foster@email.com",
        location: "Cardiff, UK",
        applicationDate: "2025-01-14",
        status: "in_progress",
        subStatus: "invited_to_pollen_interview",
        overallSkillsScore: 86,
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-14T12:20:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-14T12:20:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "49 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I'd create a comprehensive strategy starting with audience analysis and competitive benchmarking. The campaign would feature engaging content that tells the product story while encouraging user participation through contests and user-generated content.",
              wordCount: 203
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd establish baseline metrics before launch and track engagement rates, reach, and conversion metrics throughout the campaign. Key indicators would include click-through rates, lead generation, and ultimately sales attribution. I'd create weekly dashboards to monitor performance and make real-time adjustments to optimise results.",
              wordCount: 201
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "When planning my university's careers fair, we lost our main sponsor two weeks before the event and had to find replacement funding quickly. I immediately created an action plan, dividing tasks between team members and setting daily check-ins. I prioritised reaching out to local businesses first, then explored alternative funding sources. By staying focused on our goal and maintaining constant communication with the team, we secured new sponsors and delivered a successful event with over 200 attendees.",
              wordCount: 297
            }
          ]
        }
      },
      {
        id: "35",
        name: "Grace Thompson",
        email: "grace.thompson@email.com",
        location: "Newcastle, UK",
        applicationDate: "2025-01-13",
        status: "in_progress",
        subStatus: "pollen_interview_complete",
        overallSkillsScore: 89,
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-13T15:10:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-13T15:10:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "53 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "My strategy would be built on deep audience insights and platform-specific optimization. I'd create a content mix that educates, entertains, and inspires action. Influencer partnerships and community management would be crucial for building authentic engagement.",
              wordCount: 221
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd create a measurement framework that balances awareness and conversion metrics. Primary KPIs would include brand lift, engagement quality (not just quantity), lead quality scores, and customer acquisition cost. I'd use attribution modeling to understand the customer journey and measure campaign impact across multiple touchpoints, ensuring we're driving meaningful business results.",
              wordCount: 241
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "As social media coordinator for a student organisation, our main event speaker cancelled 48 hours before our annual conference. I immediately activated our crisis plan, reaching out to backup speakers while simultaneously preparing alternative content formats. I coordinated with our video team to create engaging content, updated all promotional materials, and managed communications with 300+ registered attendees. By staying calm, communicating transparently, and having contingency plans ready, we pivoted successfully and received positive feedback about our adaptability.",
              wordCount: 334
            }
          ]
        }
      },
      {
        id: "36",
        name: "Oliver Kumar",
        email: "oliver.kumar@email.com",
        location: "Sheffield, UK",
        applicationDate: "2025-01-12",
        status: "matched_to_employer", 
        subStatus: "interview_booked",
        overallSkillsScore: 94,
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-12T10:30:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-12T10:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "46 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would develop a data-driven strategy focusing on customer journey mapping and touchpoint optimization. The content strategy would include educational series, behind-the-scenes content, and strategic partnerships to maximize reach and engagement.",
              wordCount: 234
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd implement advanced analytics tracking across all touchpoints, focusing on attribution modeling and lifetime value metrics. Key performance indicators would include conversion rate optimization, customer journey completion rates, and predictive analytics for future campaign performance. I'd use machine learning tools to identify patterns and optimize in real-time for maximum ROI.",
              wordCount: 239
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "Leading a cross-functional team for a university tech startup competition, we had 48 hours to pivot our entire business model after initial market validation failed. I immediately restructured our approach using agile methodology, creating sprint goals and hourly stand-ups. I delegated based on each team member's core strengths while personally handling the most critical research and strategy elements. Through intensive collaboration and strategic time management, we presented a refined model that won second place.",
              wordCount: 312
            }
          ]
        }
      },
      {
        id: "37",
        name: "Zara Ahmed",
        email: "zara.ahmed@email.com",
        location: "Liverpool, UK",
        applicationDate: "2025-01-11",
        status: "matched_to_employer",
        subStatus: "interview_requested",
        overallSkillsScore: 87,
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-11T13:45:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-11T13:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "58 minutes",
          responses: [
            {
              questionId: 1,
              question: "Q1. Describe your approach to creating a social media strategy for a new product launch.",
              response: "I'd create an integrated campaign that builds anticipation pre-launch, creates excitement during launch, and maintains momentum post-launch. This would include teaser content, launch day activations, and ongoing community engagement strategies.",
              wordCount: 196
            },
            {
              questionId: 2,
              question: "Q2. How would you measure the success of a marketing campaign and what metrics would you prioritise?",
              response: "I'd focus on engagement quality over quantity, tracking meaningful interactions like saves, shares, and comment sentiment. Conversion tracking would include micro-conversions like email signups and macro-conversions like purchases. I'd also monitor brand sentiment shifts and community growth to measure long-term campaign impact beyond immediate sales.",
              wordCount: 218
            },
            {
              questionId: 3,
              question: "Q3. Describe a time when you had to work under pressure to meet a tight deadline. How did you manage your time and priorities?",
              response: "During my work experience at a PR agency, our client's product launch was moved up by two weeks due to competitor activity. I immediately prioritised the most impactful deliverables and created a revised timeline. I coordinated with designers, copywriters, and media contacts to streamline our process. I worked extra hours but also ensured the team stayed motivated by celebrating small wins. We successfully launched on the new timeline and the campaign exceeded engagement targets by 40%.",
              wordCount: 289
            }
          ]
        }
      },
      {
        id: "38",
        name: "Ryan O'Connor",
        email: "ryan.oconnor@email.com",
        location: "Belfast, UK",
        applicationDate: "2025-01-10",
        status: "matched_to_employer",
        subStatus: "interview_booked",
        overallSkillsScore: 83,
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-10T11:20:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-10T11:20:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "52 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "My approach would center on authentic storytelling and community building. I'd develop content that showcases real customer benefits while creating opportunities for audience interaction and feedback. Measurement and optimization would be continuous throughout.",
              wordCount: 208
            }
          ]
        }
      },
      {
        id: "39",
        name: "Isabella Rodriguez",
        email: "isabella.rodriguez@email.com",
        location: "Brighton, UK",
        applicationDate: "2025-01-09",
        status: "matched_to_employer",
        subStatus: "interview_complete",
        overallSkillsScore: 91,
        profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-09T14:15:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-09T14:15:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "47 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would build a comprehensive strategy that combines organic content with strategic paid promotion. The focus would be on creating shareable, value-driven content that naturally encourages word-of-mouth marketing and builds brand loyalty.",
              wordCount: 218
            }
          ]
        }
      },
      {
        id: "40",
        name: "Connor MacLeod",
        email: "connor.macleod@email.com",
        location: "Aberdeen, UK",
        applicationDate: "2025-01-08",
        status: "matched_to_employer",
        subStatus: "offer_issued",
        overallSkillsScore: 88,
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-08T16:30:00Z",
        assessmentSubmission: {
          submittedAt: "2025-01-08T16:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "54 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "I'd develop a multi-phased approach with pre-launch buzz building, launch day amplification, and post-launch community nurturing. Each phase would have specific goals and metrics, with content adapted for different audience segments and platforms.",
              wordCount: 225
            }
          ]
        }
      },
      // More COMPLETE candidates
      {
        id: "41",
        name: "Priya Singh",
        email: "priya.singh@email.com",
        location: "Coventry, UK",
        applicationDate: "2025-01-07",
        status: "complete",
        subStatus: "not_progressing",
        overallSkillsScore: 74,
        profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-07T12:45:00Z",
        completionStage: "application",
        feedback: "Good foundational knowledge but lacked the creative thinking required for the role.",
        assessmentSubmission: {
          submittedAt: "2025-01-07T12:45:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "61 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would create posts about the new product and share them on different social media sites. I think it's important to post regularly and use hashtags to get more people to see the posts. I would also try to get people to like and share the content.",
              wordCount: 156
            }
          ]
        }
      },
      {
        id: "42",
        name: "Jake Wilson",
        email: "jake.wilson@email.com",
        location: "Nottingham, UK",
        applicationDate: "2025-01-06",
        status: "complete",
        subStatus: "hired",
        overallSkillsScore: 96,
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-06T10:20:00Z",
        completionStage: "employer_interview",
        assessmentSubmission: {
          submittedAt: "2025-01-06T10:20:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "44 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "I would develop a comprehensive strategy integrating market research, audience segmentation, and competitive analysis. The campaign would feature multi-platform content optimization, influencer partnerships, and real-time performance monitoring with adaptive optimization protocols.",
              wordCount: 267
            }
          ]
        }
      },
      {
        id: "43",
        name: "Amelia Jones",
        email: "amelia.jones@email.com",
        location: "Portsmouth, UK",
        applicationDate: "2025-01-05",
        status: "complete",
        subStatus: "not_progressing",
        overallSkillsScore: 71,
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        applicationTime: "2025-01-05T15:30:00Z",
        completionStage: "pollen_interview",
        feedback: "Assessment responses showed promise but interview revealed gaps in practical application.",
        assessmentSubmission: {
          submittedAt: "2025-01-05T15:30:00Z",
          estimatedTime: "45-60 minutes",
          actualTime: "59 minutes",
          responses: [
            {
              questionId: 1,
              question: "Describe your approach to creating a social media strategy for a new product launch.",
              response: "I think social media is really important for marketing. I would make sure to post on Facebook, Instagram, and Twitter. The posts should be interesting and have good pictures. I would try to get people to share them with their friends.",
              wordCount: 142
            }
          ]
        }
      }
    ];
