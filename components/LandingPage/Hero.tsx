"use client";

/* Next */
import Link from "next/link";

/* Components */
import DotPattern from "@/components/magicui/dot-pattern";
import BlurFade from "../magicui/blur-fade";
import { AnimatedShinyTextDemo } from "./AnimatedShinyTextBtn";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";

/* utils */
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <BlurFade duration={0.5}>
          <Link href="https://x.com/Ijon_k4" target="_blank">
            <AnimatedShinyTextDemo />
          </Link>
          <div>
            <h1 className="flex flex-col items-center justify-center gap-2 w-full whitespace-pre-wrap text-center text-5xl md:text-7xl 2xl:text-[90px] font-extrabold tracking-tighter text-black [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%)]">
              <span className="flex flex-col">
                <span>
                  Showcase Your Journey
                </span>
                <span className="flex-wrap">
                  as a <span className="text-primary">Founder</span> in Minutes
                </span>
              </span>
            </h1>
            <p className="mt-5 text-center text-lg text-gray-500 [text-shadow:_0_1px_2px_rgb(255_255_255_/_70%)]">
              Create a highly customizable single-page website to share your journey as a foundr.
            </p>
          </div>
        </BlurFade>
        <BlurFade duration={0.75} className="z-10 mt-5">
          <Link href="signup" target="_blank">
            <Button variant="default" className="group hover:bg-secondary px-10 py-2 rounded-md">
              Get Started
              <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </Link>
        </BlurFade>
      </div>
      
      {/* DotPattern positioned absolutely */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:radial-gradient(1400px_circle_at_center,white,transparent)]",
            "w-full h-full"
          )}
        />
      </div>
    </div>
  );
}