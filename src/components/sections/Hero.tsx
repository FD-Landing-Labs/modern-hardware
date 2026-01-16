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
    transition: { duration: 0.5, ease: easeOut },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function Hero() {
  const { hero, offers } = data;

  // Feature cards from offers data
  const featureCards = [
    {
      id: "main-offer",
      title: offers.mainOffer.title,
      subtitle: offers.mainOffer.subtitle,
      description: offers.mainOffer.description,
      cta: offers.mainOffer.cta.label,
      href: offers.mainOffer.cta.href,
      image: offers.mainOffer.image,
    },
    ...offers.secondaryOffers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      subtitle: offer.subtitle,
      description: "",
      cta: "Shop Now",
      href: offer.href,
      image: offer.image,
    })),
  ];

  return (
    <section id="hero" className="bg-background m-2 max-w-7xl mx-auto px-2 md:px-0">
      {/* Main Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-2 "
      >
        {/* Left - Yellow CTA Panel */}
        <motion.div
          variants={itemVariants}
          className="bg-primary-400 p-6 flex flex-col justify-between min-h-[300px] lg:min-h-[400px] rounded-2xl "
        >
          <h1 className="text-3xl md:text-4xl  font-bold text-white leading-[1.1] tracking-tighter mb-6">
            {hero.headline.split(" ").slice(0, 2).join(" ")}
            <br />
            {hero.headline.split(" ").slice(2, 4).join(" ")}
            <br />
            {hero.headline.split(" ").slice(4).join(" ")}
          </h1>
          <div>
            <p className="text-white/90 font-semibold text-lg mb-1">UP TO 40% OFF</p>
            <p className="text-white/70 text-base mb-6">Select Hardware Essentials</p>
            <Link
              href={hero.cta.href}
              className="inline-flex items-center justify-center w-fit px-6 py-2.5 bg-white text-[#1a1a1a] text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
            >
              {hero.cta.label}
            </Link>
          </div>
        </motion.div>

        {/* Right - Hero Image with Badge */}
        <motion.div
          variants={imageVariants}
          className="relative min-h-[300px] lg:min-h-[400px] overflow-hidden rounded-2xl lg:col-span-2"
        >
          <Image
            src={"/assets/images/hero.png"}
            alt={offers.mainOffer.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Discount Badge */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 rounded-2xl overflow-hidden">
            <div className="bg-[#0066cc] text-white px-4 py-3 text-center">
              <span className="text-[10px] uppercase tracking-wider block">Up to</span>
              <span className="text-3xl md:text-4xl font-bold block leading-none">40%</span>
              <span className="text-[10px] uppercase tracking-wider block">Off</span>
            </div>
          </div>
          {/* Badge */}
          {offers.mainOffer.badge && (
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 rounded-2xl overflow-hidden">
              <span className="bg-[#f59e0b] text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                {offers.mainOffer.badge}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Feature Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
      >
        {featureCards.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            className="relative group min-h-[280px] md:min-h-[320px] overflow-hidden rounded-2xl cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Dark Overlay - Animates from bottom to top on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

            {/* Base subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Card Content */}
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
              {/* Title */}
              <h3 className="text-lg md:text-2xl font-semibold capitalize tracking-tight mb-6 text-white">
                {card.title}
              </h3>

              <div>
                {/* Subtitle / Discount - Hidden by default, shown on hover */}
                <p className="text-sm md:text-base font-semibold capitalize tracking-tight mb-2 text-gray-200 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {card.subtitle}
                </p>

                {/* Description - Hidden by default, shown on hover */}
                {card.description && (
                  <p className="text-xs md:text-sm mb-4 text-white/80 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    {card.description}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center w-fit px-5 py-2 rounded-2xl border border-white/60 text-[11px] font-bold uppercase tracking-wider text-white/90 hover:bg-white hover:text-black transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-200"
                >
                  {card.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
