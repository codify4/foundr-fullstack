import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import AnimatedBeamOutput from "./AnimatedBeam";
import { CalendarCheck, ChartLine, LinkIcon, ProjectorIcon } from "lucide-react";
import { AnimatedListDemo } from "./AnimatedList";
import { ChartDemo } from "./DemoChart";
import { PieChartDemo } from "./PieChartDemo";

const features = [
  {
    Icon: ProjectorIcon,
    name: "Share your project",
    description: "Give brief info on past projects",
    href: "/",
    background: <AnimatedListDemo className="absolute flex md:items-end lg:items-start xl:items-center h-[300px] w-[400px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"/>, 
    className: "col-span-1 row-span-1 h-[350px]"
  },
  {
    Icon: LinkIcon,
    name: "Link your socials",
    description: "Embed your socials link in the page for others to see.",
    href: "/",
    background: <AnimatedBeamOutput className="absolute -right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"/>,
    className: "col-span-2 row-span-1",
  },
  {
    Icon: CalendarCheck,
    name: "Activity Graphs",
    description: "Connect your GitHub contributions graph or a custom X posts graph.",
    className: "col-span-2 row-span-1 relative overflow-hidden",
    href: "#",
    background: (
      <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center ">
        <PieChartDemo className="h-[300px] w-[500px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"/>
      </div>
    ),
  },
  {
    Icon: ChartLine,
    name: "Analytics",
    description:
      "Get insights about what happens on your page with page views, clicks, and more.", 
    href: "/",
    background: <ChartDemo className="absolute h-[300px] w-[400px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"/>,
    className: "col-span-1 row-span-1",
  },
];

export default async function Features() {
  return (
    <BentoGrid className="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 sm:grid-rows-2 gap-4 my-10 w-full md:w-3/4 lg:w-11/12 xl:w-10/12 2xl:w-9/12">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
