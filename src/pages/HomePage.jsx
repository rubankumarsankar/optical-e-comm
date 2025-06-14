import BrandMarquee from "../components/BrandMarquee";
import Hero from "../components/Hero";
import PromoBanner from "../components/PromoBanner";
import BestsellersSection from "./BestsellersSection";
import CategorySection from "./CategorySection";

export default function HomePage() {
  return (
    <>
    <Hero />
    
    <CategorySection />
    <BestsellersSection />
    <BrandMarquee />
    </>
  );
}