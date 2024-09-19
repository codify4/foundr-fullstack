import PricingCard from "./PricingCard";
import { PRICING } from "../../constants/pricing";
 
export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-16 md:py-24">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">Pricing Plans</h1>
        <p className="text-lg mb-10 text-center font-extralight text-muted-foreground w-1/3 flex-wrap">Create a good looking site to share your projects and connect with other founders.</p>
        
        <div className="flex flex-col lg:flex-row flex-wrap items-stretch justify-center gap-8 w-full">
          {PRICING.map((pricing, index) => (
            <PricingCard 
              key={index}
              title={pricing.title} 
              price={pricing.price} 
              featuresYes={pricing.featuresYes} 
              featuresNo={pricing.featuresNo}
              recommended={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}