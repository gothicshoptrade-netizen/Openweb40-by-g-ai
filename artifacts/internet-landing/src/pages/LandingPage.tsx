import HeroSection from "@/components/sections/HeroSection";
import ProblemsSection from "@/components/sections/ProblemsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactFormSection from "@/components/sections/ContactFormSection";
import BlogSection from "@/components/sections/BlogSection";
import StatsSection from "@/components/sections/StatsSection";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Header />
      <main>
        <HeroSection />

        {/* Bento Grid Layout */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 md:pt-32 space-y-24 md:space-y-32">
          {/* Row 1: Problems + How We Work */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            <div className="lg:col-span-7 bento-card">
              <ProblemsSection />
            </div>
            <div className="lg:col-span-5 bento-card">
              <HowWeWorkSection />
            </div>
          </div>

          {/* Row 2: Stats + Solutions */}
          <div className="space-y-24 md:space-y-32">
            <StatsSection />
            <div className="bento-card">
              <SolutionsSection />
            </div>
          </div>

          {/* Row 3: Calculator + FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            <div className="lg:col-span-5 bento-card">
              <CalculatorSection />
            </div>
            <div className="lg:col-span-7 bento-card">
              <FaqSection />
            </div>
          </div>

          {/* Row 4: Contact */}
          <div className="pb-32 md:pb-40">
            <div className="bento-card">
              <ContactFormSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
