"use client";
import { BentoGrid, BentoGridItem } from "../custom-ui/bento-grid";

import { cn } from "@/lib/utils";
import { SkeletonSolutionThree } from "@/components/skeletons";

export default function BentoGridAboutUs() {
  return (
    <BentoGrid className="container mx-auto md:auto-rows-[20rem] my-20">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          className={cn("[&>p:text-lg]", item.className)}
          description={item.description}
          header={item.header}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Faster Turnaround",
    description: (
      <span className="text-sm">
        Up to 60% faster production turnaround compared to typical industry
        timelines, positioning your products ahead of competitors.
      </span>
    ),
    header:
      "https://images.unsplash.com/photo-1526676317768-d9b14f15615a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },
  {
    title: "Improved Satisfaction",
    description: (
      <span className="text-sm">
        30% improvement in customer satisfaction ratings, achieved through
        reliable quality, consistent delivery, and dedicated service.
      </span>
    ),
    header: <SkeletonSolutionThree />,
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },
];
