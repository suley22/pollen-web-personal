"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/app/(pages)/login/_components/testimonialCard";

const testimonials = [
  {
    name: "Lily Bissett",
    title: "Director of People, Finance & Operations",
    rating: 5,
    testimonial:
      "I got in touch with Pollen on Thursday and met a candidate on Friday, who then started the following Tuesday. I couldn't believe the turnaround time and was really impressed with our temp, who is keen, proactive and works independently really well.",
  },
  {
    name: "Marcus Chen",
    title: "Head of Engineering",
    rating: 5,
    testimonial:
      "The quality of candidates we received was exceptional. Within just two weeks, we had three outstanding developers join our team. The screening process was thorough and saved us countless hours.",
  },
  {
    name: "Sarah Williams",
    title: "VP of Marketing",
    rating: 5,
    testimonial:
      "Outstanding service from start to finish. The team understood our unique requirements and delivered exactly what we needed. Our new marketing specialist has already made a significant impact.",
  },
  {
    name: "David Rodriguez",
    title: "Operations Manager",
    rating: 5,
    testimonial:
      "Professional, efficient, and reliable. They helped us scale our operations team quickly during a critical growth period. Couldn't be happier with the results.",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="h-80 flex items-center justify-center">
        <TestimonialCard {...testimonials[currentIndex]} />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-gray-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
