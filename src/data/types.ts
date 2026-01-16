// Site Configuration Types
export interface Logo {
  default: string;
  white: string;
  alt: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logo: Logo;
  seo: SEO;
}

// Navbar Types
export interface NavLink {
  name: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface MegaMenu {
  columns: MegaMenuColumn[];
}

export interface MainNavLink {
  id: string;
  name: string;
  href: string;
  megaMenu?: MegaMenu;
}

export interface NavbarContact {
  email: string;
  phone: string;
}

export interface SocialLink {
  name: string;
  href: string;
}

export interface NavbarConfig {
  brandName: string;
  mainLinks: MainNavLink[];
  contact: NavbarContact;
  socialLinks: SocialLink[];
}

// Hero Types
export interface HeroBadge {
  text: string;
  innerText: string;
}

export interface HeroTestimonial {
  quote: string;
  author: string;
}

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  bgColor: string;
}

export interface HeroFeatureIndicator {
  number: string;
  label: string;
  description: string;
}

export interface HeroConfig {
  badge: HeroBadge;
  headline: string;
  cta: CTAButton;
  testimonial: HeroTestimonial;
  images: HeroImage[];
  featureIndicator: HeroFeatureIndicator;
}

// Categories Types
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount: string;
}

export interface CategoriesConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  items: CategoryItem[];
}

// Featured Products Types
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  image: string;
  rating: string;
  reviews: string;
  badge: string | null;
  category: string;
}

export interface FeaturedProductsConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  cta: CTAButton;
  items: ProductItem[];
}

// Offers Types
export interface MainOffer {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: CTAButton;
  endDate: string;
  badge: string;
}

export interface SecondaryOffer {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export interface OfferBanner {
  id: string;
  label: string;
  headline: string;
  highlight: string;
  image: string;
  href: string;
  theme: "dark" | "red";
}

export interface OffersConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  mainOffer: MainOffer;
  secondaryOffers: SecondaryOffer[];
  banners: OfferBanner[];
}

// About Types
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutValue {
  id: string;
  title: string;
}

export interface AboutTestimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface AboutConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  image: string;
  highlights: string[];
  stats: AboutStat[];
  values: AboutValue[];
  featuredTestimonial: AboutTestimonial;
}

// Brand Logos Types
export interface BrandItem {
  id: string;
  name: string;
  logo: string;
}

export interface BrandLogosConfig {
  sectionLabel: string;
  headline: string;
  subheadline: string;
  description: string;
  items: BrandItem[];
}

// Testimonials Types
export interface RatingCategory {
  label: string;
  value: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: string;
  quote: string;
  avatar: string;
  date: string;
}

export interface TestimonialsConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  badge: string;
  overallRating: string;
  ratingCategories: RatingCategory[];
  items: TestimonialItem[];
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  sectionLabel: string;
  sectionNumber: string;
  headline: string;
  description: string;
  cta: CTAButton;
  items: FAQItem[];
}

// Footer Types
export interface FooterBrand {
  name: string;
  tagline: string;
}

export interface FooterContact {
  email: string;
  phone: string;
  address: string;
}

export interface FooterOffice {
  label: string;
  lines: string[];
}

export interface FooterHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface FooterConfig {
  brand: FooterBrand;
  headline: string;
  taglineSmall: string;
  description: string;
  cta: CTAButton;
  contact: FooterContact;
  office: FooterOffice;
  hours: FooterHours;
  location: string;
  quickLinks: NavLink[];
  linkGroups: FooterLinkGroup[];
  socialLinks: SocialLink[];
  bottomLinks: NavLink[];
  copyright: string;
}

// Main Placeholder Data Type
export interface PlaceholderData {
  site: SiteConfig;
  navbar: NavbarConfig;
  hero: HeroConfig;
  categories: CategoriesConfig;
  featuredProducts: FeaturedProductsConfig;
  offers: OffersConfig;
  about: AboutConfig;
  brandLogos: BrandLogosConfig;
  testimonials: TestimonialsConfig;
  faq: FAQConfig;
  footer: FooterConfig;
}
