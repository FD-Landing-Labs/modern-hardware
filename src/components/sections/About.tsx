"use client";

import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { data } from "@/data";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export function About() {
  const { headline, description, values, featuredTestimonial, stats } =
    data.about;

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-[#f8f8f8]">
      <div className="container max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter capitalize text-foreground leading-[0.9]"
            >
              {headline}
            </motion.h2>

            {/* Values List */}
            <motion.ul variants={itemVariants} className="space-y-3 pt-4">
              {values.map((value) => (
                <li
                  key={value.id}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <Plus className="w-3.5 h-3.5 text-primary-400" strokeWidth={3} />
                  <span className="text-lg tracking-tight">{value.title}</span>
                </li>
              ))}
            </motion.ul>

            {/* Featured Testimonial */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/50"
            >
              {/* Star Rating */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: featuredTestimonial.rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary-400 text-primary-400"
                    />
                  )
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-muted-foreground leading-relaxed tracking-tight mb-4 max-w-sm">
                "{featuredTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {featuredTestimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-lg tracking-tighter font-medium text-foreground">
                    {featuredTestimonial.author}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {featuredTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col"
          >
            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-2xl text-muted-foreground leading-relaxed tracking-tighter max-w-lg"
            >
              {description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-auto pt-12 lg:pt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  className="text-center lg:text-left bg-white rounded-lg p-4 shadow-sm min-h-40 md:min-h-64 flex flex-col justify-center md:justify-between"
                >
                  <p className="text-5xl lg:text-5xl font-bold tracking-tighter text-primary-400">
                    {stat.value}
                  </p>
                  <p className="text-base text-muted-foreground leading-snug tracking-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
