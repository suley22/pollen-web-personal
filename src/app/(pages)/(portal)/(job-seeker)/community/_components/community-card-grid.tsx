import { url } from "zod";
import { CommunityCard } from "./community-card";
import {
  Calendar,
  Users,
  UserCheck,
  Trophy,
  Mic,
  BookOpen,
} from "lucide-react";

export function CommunityCardGrid() {
  const cards = [
    {
      color: "blue",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Events & Workshops",
      subtitle:
        "Join workshops, networking meetups, and masterclasses (online and in-person)",
      buttonText: "View Events",
      url: "https://www.eventbrite.co.uk/o/pollen-careers-73154712323",
    },
    {
      color: "yellow",
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      title: "Weekly Community Drop-in",
      subtitle:
        "Meet the Pollen team every Monday in a relaxed, low-pressure environment for career support",
      buttonText: "Join Drop-In",
      url: "https://calendly.com/pollencareers/ask-us-anything",
    },
    {
      color: "pink",
      icon: <UserCheck className="w-8 h-8 text-pink-600" />,
      title: "Mentoring",
      subtitle: "Connect with industry professionals for career guidance",
      buttonText: "Find Mentors",
      url: "https://pollencareers.notion.site/ec2194fcfc714e8aa3e64e202ec82883?v=d353ebd20e104630856e4d69d3462615",
    },
    {
      color: "orange",
      icon: <BookOpen className="w-8 h-8 text-orange-600" />,
      title: "Resource Hub",
      subtitle: "Access career guides and professional development materials",
      buttonText: "Browse Resources",
      url: "https://pollencareers.notion.site/pollencareers/Pollen-s-Resource-Hub-b5520f2ec199400bb3761dcfe31cab5f",
    },
    {
      color: "yellow",
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      title: "Pollen Bootcamp",
      subtitle: "Transform your career with our intensive 5-day programme",
      buttonText: "Learn More",
      url: "https://pollen.co/reboot",
    },
    {
      color: "purple",
      icon: <Mic className="w-8 h-8 text-purple-600" />,
      title: "Podcast",
      subtitle: "Listen to career insights and expert interviews",
      buttonText: "Listen Now",
      url: "https://open.spotify.com/show/53iLe2ofx3LTzukiq9beUg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <CommunityCard
          key={card.title}
          color={card.color}
          icon={card.icon}
          title={card.title}
          subtitle={card.subtitle}
          buttonText={card.buttonText}
          url={card.url}
        />
      ))}
    </div>
  );
}
