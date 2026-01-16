import { Navbar } from "@/components/layout";
import { Hero, Categories, FeaturedProducts, Offers, About, Testimonials, FAQ, Brands, Footer } from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Offers />
      <About />
      <Testimonials />
      <Brands />
      <FAQ />
      <Footer />
    </main>
  );
}
