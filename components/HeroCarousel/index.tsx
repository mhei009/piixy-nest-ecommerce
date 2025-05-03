"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "@/sanity.types";
import Image from "next/image"; 
import { urlFor } from "@/sanity/lib/image";


interface HeroCarouselProps {
  slides: Carousel[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);


  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));


  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) => (
          index === current && (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full flex items-center justify-center bg-black/50 text-white"
            >
              <Image
                src={urlFor(slide.imageUrl).url()}
                alt={slide.title || "Default Alt Text"}
                layout="fill" 
                objectFit="cover" 
                className="-z-10"
              />
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold">{slide.title}</h1>
                <p className="text-lg mt-2">{slide.description}</p>
                <Button className="mt-4">Learn More</Button>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
