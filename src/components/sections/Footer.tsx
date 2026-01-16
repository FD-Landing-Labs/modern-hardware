"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { data } from "@/data";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export function Footer() {
  const {
    brand,
    taglineSmall,
    contact,
    office,
    cta,
    quickLinks,
    socialLinks,
    location,
    copyright,
  } = data.footer;

  return (
    <footer id="footer" className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Top Section - Email & CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16 md:mb-20"
          >
            {/* Left - Tagline & Email */}
            <div>
              <p className="text-sm text-white/50 mb-4">{taglineSmall}</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight lowercase hover:text-white/80 transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>

          {/* Middle Section - Links & Office */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:justify-between gap-12 mb-16 md:mb-20"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl md:text-2xl font-semibold text-white hover:text-white/70 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Office Address */}
            <div className="text-right">
              <h4 className="text-base font-semibold text-white mb-3">
                {office.label}
              </h4>
              <address className="not-italic text-sm text-white/60 leading-relaxed">
                {office.lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </motion.div>

          {/* Large Brand Name */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h2 className="text-[clamp(4rem,15vw,12rem)] font-bold -tracking-[0.08em] leading-none text-primary-400 select-none">
              {brand.name}
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-400 text-[#0a0a0a] px-6 md:px-10 lg:px-16 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Copyright */}
          <p className="text-[#0a0a0a]/70">{copyright}</p>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#0a0a0a]/70">
            <Globe className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks
              .filter((s) => s.name === "Instagram" || s.name === "LinkedIn")
              .map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors"
                >
                  {social.name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
