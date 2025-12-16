import { HeroSection } from "@/components/HeroSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ProductSection } from "@/components/ProductSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { BaseAISection } from "@/components/BaseAISection";
import { JourneySection } from "@/components/JourneySection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { TrustedSection } from "@/components/TrustedSection";
import { FAQSection } from "@/components/FAQSection";
import { BlogSection } from "@/components/BlogSection";
import { CTASection } from "@/components/CTASection";
import { FloatingButtons } from "@/components/FloatingButtons";

// This is a Server Component by default - good for SEO
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="overflow-x-hidden">
        <HeroSection />
        <LogoCarousel />
        <ProductSection />
        <IndustriesSection />
        <BaseAISection />
        <JourneySection />
        <IntegrationsSection />
        <TrustedSection />
        <FAQSection />
        <BlogSection />
        <CTASection />
      </div>
      <FloatingButtons />
    </div>
  );
}
