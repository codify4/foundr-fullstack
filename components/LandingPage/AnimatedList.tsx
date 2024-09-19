"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  mrr: string;
}

let notifications = [
  {
    name: "Trackr.gl",
    description: "Track your habits",
    icon: "📝",
    color: "#00C9A7",
    mrr: "$100"
  },
  {
    name: "Transcript",
    description: "Transcribe real-time audio",
    icon: "🎙️",
    color: "#FFB800",
    mrr: "$0"
  },
  {
    name: "MeetingMinder",
    description: "Schedule meetings",
    icon: "🗓️",
    color: "#FF3D71",
    mrr: "$1500"
  },
  {
    name: "InvoiceEase",
    description: "Generate invoices",
    icon: "💳",
    color: "#1E86FF",
    mrr: "$40"
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, mrr }: Item) => {
  return (
    <figure
      className={cn(
        "flex flex-col items-start justify-center relative mx-auto h-[80px] w-[350px] cursor-pointer overflow-hidden rounded-2xl px-3 border",
        // animation styles
        "transition-all duration-200 ease-in-out",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="mx-1">{mrr}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
