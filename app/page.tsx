import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Pricing from "@/components/LandingPage/Pricing";
import TopNav from "@/components/LandingPage/TopNav";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <TopNav />
      <main className="flex flex-col items-center justify-center mb-10">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}