"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/data";
import { ArrowRight } from "lucide-react";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
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

export function Categories() {
  const { categories } = data;

  const totalProducts = categories.items.reduce(
    (acc, item) => acc + parseInt(item.productCount.replace(/\D/g, "")),
    0
  );

  // Split items into two rows (5 + 5 categories + 1 "All" card)
  const firstRowItems = categories.items.slice(0, 5);
  const secondRowItems = categories.items.slice(5);

  return (
    <section id="categories" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="mx-auto px-2 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex items-baseline gap-3 mb-4 md:mb-16 max-w-2xl "
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-foreground tracking-tighter">
            {categories.headline}
          </h2>
          <span className="text-lg md:text-xl font-light text-muted-foreground/40">
            {totalProducts.toLocaleString()}
          </span>
        </motion.div>

        {/* First Row - 5 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-3"
        >
          {firstRowItems.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`#${category.id}`} className="group block">
                <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 min-h-40">
                  {/* Category Name */}
                  <div className="p-4">
                    <span className="text-xl text-gray-600 font-semibold leading-tight block tracking-tight">
                      {category.name}
                    </span>
                  </div>
                  {/* Image Container */}
                  <div className="relative left-16 w-full flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      height={600}
                      width={600}
                      className="object-contain transition-transform duration-300 ease-out group-hover:scale-105 h-40 w-80 aspect-squ"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - 6 columns (5 items + All categories) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        >
          {secondRowItems.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`#${category.id}`} className="group block">
                <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 min-h-40">
                  {/* Category Name */}
                  <div className="p-4">
                    <span className="text-xl text-gray-600 font-semibold leading-tight block tracking-tight">
                      {category.name}
                    </span>
                  </div>
                  {/* Image Container */}
                  <div className="relative left-16 -bottom-5 w-full flex items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      height={600}
                      width={600}
                      className="object-contain transition-transform duration-300 ease-out group-hover:scale-105 h-40 w-80 aspect-squ"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View All Card */}
          <motion.div variants={itemVariants}>
            <Link href="#" className="group block h-full">
              <div className="relative bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5 h-full flex flex-col justify-center">
                {/* Arrow Icon Container */}
                {/* <div className="relative aspect-[4/3] w-full p-4 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-100 shadow-sm">
                    <ArrowRight className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div> */}

                {/* Label */}
                <div className="px-4 pb-4 mx-auto">
                  <span className="text-xl text-gray-600 font-medium leading-tight tracking-tighter flex items-center gap-1">
                    All Categories
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
