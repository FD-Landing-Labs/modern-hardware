"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { data } from "@/data";
import { Marquee } from "@/components/ui/marquee";
import type { TestimonialItem } from "@/data/types";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const Quote = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004z" />
  </svg>
);

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="w-[320px] md:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 shadow border-border/30 mr-2">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-primary-400 mb-4" />

      {/* Quote Text */}
      <p className="text-sm md:text-lg tracking-tight text-muted-foreground leading-relaxed mb-6 min-h-[80px]">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="text-lg tracking-tighter font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { headline, badge, items } = data.testimonials;

  // Split testimonials into two rows
  const firstRow = items.slice(0, Math.ceil(items.length / 2));
  const secondRow = items.slice(Math.ceil(items.length / 2));

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex flex-col items-start md:items-center md:text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-400 text-white text-xs font-medium mb-6">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tighter capitalize text-foreground max-w-2xl leading-tight">
            {headline}
          </h2>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-2 ">
        {/* First Row - Left to Right */}
        <Marquee pauseOnHover duration="50s">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>

        {/* Second Row - Right to Left (reverse) */}
        <Marquee pauseOnHover reverse duration="50s">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
