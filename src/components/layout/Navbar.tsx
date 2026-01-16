"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { data } from "@/data";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const { navbar } = data;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const activeMegaMenu = navbar.mainLinks.find(
    (link) => link.id === activeMenu && link.megaMenu
  )?.megaMenu;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-100 rounded-b-2xl mx-auto max-w-7xl"
        ref={navRef}
      >
        <nav className="relative">
          {/* Main Nav Bar */}
          <div className="flex items-center justify-between h-16 px-6 lg:px-10">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold tracking-tighter text-primary-950 ">
                {navbar.brandName}
              </span>
            </Link>

            {/* Center Navigation Links */}
            <div
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={handleMouseLeave}
            >
              {navbar.mainLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-colors
                      hover:text-foreground
                      ${activeMenu === link.id ? "text-foreground" : "text-muted-foreground"}
                    `}
                  >
                    {link.name}
                    {/* Underline indicator */}
                    {activeMenu === link.id && link.megaMenu && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute left-4 right-4 bottom-0 h-[2px] bg-foreground"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline text-sm">Search</span>
              </button>

              {/* Wishlist - Hidden on mobile */}
              <button className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-muted-foreground hover:text-foreground transition-colors ml-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {activeMenu && activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden bg-white"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="container max-w-6xl mx-auto p-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="grid grid-cols-4 gap-8"
                  >
                    {activeMegaMenu.columns.map((column, colIndex) => (
                      <div key={column.title}>
                        <h3 className="text-lg font-semibold text-black mb-4 tracking-tighter">
                          {column.title}
                        </h3>
                        <ul className="space-y-3">
                          {column.links.map((link, linkIndex) => (
                            <motion.li
                              key={link.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.05 + colIndex * 0.02 + linkIndex * 0.01,
                              }}
                            >
                              <Link
                                href={link.href}
                                className="text-base text-gray-800 hover:text-foreground transition-colors"
                              >
                                {link.name}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom Border */}
                <div className="border-b border-border" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden absolute left-0 right-0 top-full bg-background border-b border-border overflow-hidden"
              >
                <div className="px-4 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                  {/* Mobile Navigation Links */}
                  <nav className="space-y-1">
                    {navbar.mainLinks.map((link) => (
                      <div key={link.id} className="border-b border-border/50 last:border-b-0">
                        {link.megaMenu ? (
                          <>
                            <button
                              onClick={() =>
                                setExpandedMobileMenu(
                                  expandedMobileMenu === link.id ? null : link.id
                                )
                              }
                              className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground"
                            >
                              {link.name}
                              <ChevronDown
                                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedMobileMenu === link.id ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                            <AnimatePresence>
                              {expandedMobileMenu === link.id && link.megaMenu && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-3 pl-4 space-y-4">
                                    {link.megaMenu.columns.map((column) => (
                                      <div key={column.title}>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                          {column.title}
                                        </h4>
                                        <ul className="space-y-2">
                                          {column.links.map((subLink) => (
                                            <li key={subLink.name}>
                                              <Link
                                                href={subLink.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-sm text-foreground/80 hover:text-foreground transition-colors"
                                              >
                                                {subLink.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-3 text-sm font-medium text-foreground"
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                      Wishlist
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[60] flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full h-14 pl-12 pr-4 text-lg bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
