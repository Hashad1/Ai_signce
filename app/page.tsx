import { HeroSection } from "@/components/sections/hero/hero-section";
import { FeaturesSection } from "@/components/sections/features/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { FAQSection } from "@/components/sections/faq/faq-section";
import { IntroSection } from "@/components/sections/intro/intro-section";
import { BenefitsSection } from "@/components/sections/benefits/benefits-section";
import { Footer } from "@/components/sections/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}