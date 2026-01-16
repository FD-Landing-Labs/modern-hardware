"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/data";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
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

export function Offers() {
  const { banners } = data.offers;

  return (
    <section id="offers" className="py-8 md:py-12 lg:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {banners.map((banner) => (
            <motion.div
              key={banner.id}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl min-h-[280px] md:min-h-[320px] ${banner.theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]"
                }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={banner.image}
                  alt={banner.headline}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${banner.theme === "dark" ? "opacity-60" : "opacity-40"
                    }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 ${banner.theme === "dark"
                    ? "bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/0 to-transparent"
                    : "bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/0 to-transparent"
                    }`}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  {/* Label */}
                  <span
                    className={`text-[10px] md:text-xs font-medium uppercase tracking-widest mb-3 ${banner.theme === "dark" ? "text-white/60" : "text-white/80"
                      }`}
                  >
                    {banner.label}
                  </span>

                  {/* Headline */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tighter mb-6 text-white">
                    {banner.headline}
                    <br />
                    <span className="block">{banner.highlight}</span>
                  </h3>
                </div>

                {/* CTA Button */}
                <Link
                  href={banner.href}
                  className={`inline-flex items-center justify-center w-fit px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm bg-white  hover:bg-primary-500 hover:text-white`}
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
