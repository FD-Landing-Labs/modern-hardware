"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Share2, Star } from "lucide-react";
import { data } from "@/data";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

interface ProductItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  image: string;
  rating: string;
  reviews: string;
  badge: string | null;
  category: string;
  description: string;
}

function ProductCard({
  product,
  onClick,
}: {
  product: ProductItem;
  onClick?: () => void;
}) {
  // Parse price string to number for display
  const priceValue = parseFloat(product.price.replace("$", ""));

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#f59e0b] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-normal text-foreground truncate tracking-tighter">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-foreground">{product.price}</p>
        {product.originalPrice && (
          <p className="text-md text-muted-foreground line-through">
            {product.originalPrice}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const { featuredProducts } = data;
  const [showFeatured, setShowFeatured] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(featuredProducts.items[0]);

  // Split products into rows
  const topRowProducts = featuredProducts.items.slice(0, 5);
  const bottomRowProducts = featuredProducts.items.slice(2, 6);

  const handleProductClick = (product: ProductItem) => {
    setSelectedProduct(product);
    setShowFeatured(true);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-2">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex items-center justify-between mb-4 md:mb-16"
        >
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-foreground tracking-tighter mt-1">
              {featuredProducts.headline}
            </h2>
          </div>
          <Link
            href={featuredProducts.cta.href}
            className="hidden sm:inline-flex text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {featuredProducts.cta.label} →
          </Link>
        </motion.div>

        {/* Top Row Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4"
        >
          {topRowProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </motion.div>

        {/* Featured Product Panel */}
        <AnimatePresence>
          {showFeatured && selectedProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="mb-2 overflow-hidden hidden md:block"
            >
              <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
                  {/* Product Image */}
                  <motion.div
                    key={selectedProduct.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
                    className="relative aspect-video max-w-l mx-auto lg:mx-0"
                  >
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </motion.div>

                  {/* Product Info */}
                  <motion.div
                    key={`info-${selectedProduct.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
                    className="relative bg-gray-300/10 flex flex-col rounded-2xl p-6 h-full justify-between"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setShowFeatured(false)}
                      className="absolute  right-3 md:top-3 md:right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                      aria-label="Close featured product"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {/* Category & Name */}
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {selectedProduct.category}
                    </p>
                    <div>
                      <h3 className="text-2xl md:text-5xl font-semibold text-foreground tracking-tighter mb-2">
                        {selectedProduct.name}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-2 max-w-md">
                        {selectedProduct.description}
                      </p>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                          <span className="text-sm font-medium">{selectedProduct.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({selectedProduct.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <p className="text-xl font-bold text-foreground">
                        {selectedProduct.price}
                      </p>
                      {selectedProduct.originalPrice && (
                        <p className="text-lg text-muted-foreground line-through">
                          {selectedProduct.originalPrice}
                        </p>
                      )}
                      {selectedProduct.discount && (
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                          {selectedProduct.discount}
                        </span>
                      )}
                    </div>

                    <div>
                      {/* Description */}


                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <Link
                          href="#"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-2.5 bg-foreground text-background text-xs font-medium rounded-md hover:bg-foreground/90 transition-colors"
                        >
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Row Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {bottomRowProducts.map((product) => (
            <ProductCard
              key={`bottom-${product.id}`}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={featuredProducts.cta.href}
            className="inline-flex text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            {featuredProducts.cta.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
