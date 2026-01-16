"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { data } from "@/data";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export function Brands() {
  const { headline, subheadline, description, items } = data.brandLogos;

  return (
    <section id="brands" className="py-16 md:py-20 lg:py-24 bg-[#f5f5f7]">
      <div className="container max-w-7xl mx-auto px-2">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16">
          {/* Left - Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize tracking-tighter text-primary-500 leading-tight">
              {headline}
            </h2>
          </motion.div>

          {/* Right - Subheadline and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="space-y-4"
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
              {subheadline}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
        >
          {items.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className="group flex items-center justify-center p-6 md:p-8 bg-white rounded-xl border border-border/30 hover:border-border/60 hover:shadow-sm transition-all duration-300"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={50}
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
