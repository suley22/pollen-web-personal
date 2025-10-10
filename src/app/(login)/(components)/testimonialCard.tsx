import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  testimonial: string;
}

export function TestimonialCard({
  name,
  title,
  avatar,
  rating,
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-md">
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={avatar || "/placeholder.svg"}
            alt={name}
            className={cn("w-16 h-16")}
          />
          <AvatarFallback className="bg-slate-400 text-white text-lg">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{title}</p>
        </div>

        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        <blockquote className="text-gray-700 text-sm leading-relaxed italic">
          "{testimonial}"
        </blockquote>
      </div>
    </div>
  );
}
