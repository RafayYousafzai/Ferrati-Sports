"use client";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import {
  SkeletonProblemOne,
  SkeletonProblemTwo,
  SkeletonProblemThree,
  SkeletonProblemFour,
  SkeletonProblemFive,
  SkeletonSolutionOne,
  SkeletonSolutionTwo,
  SkeletonSolutionThree,
  SkeletonSolutionFour,
} from "@/components/skeletons";

export default function BentoGridAboutUs() {
  return (
    <BentoGrid className="container mx-auto md:auto-rows-[20rem] my-20">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Inconsistent Quality",
    description: (
      <span className="text-sm">
        Dealing with inconsistent stitching, poor fabric quality, and color
        mismatches.
      </span>
    ),
    header:
      "https://plus.unsplash.com/premium_photo-1675706153768-7022fcccd2b2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },
  {
    title: "Frequent Delays",
    description: (
      <span className="text-sm">
        Frequent delays causing frustrated clients and lost sales.
      </span>
    ),
    header: <SkeletonProblemOne />,
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },
  {
    title: "Design Compromises",
    description: (
      <span className="text-sm">
        Compromising your designs due to restrictive fabric options, high MOQs,
        and inflexible production.
      </span>
    ),
    header:
      "https://plus.unsplash.com/premium_photo-1684958840219-d36c30e00b38?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },

  {
    title: "Hidden Costs",
    description: (
      <span className="text-sm">
        Unclear pricing structures, sudden hidden charges, and unreliable refund
        policies.
      </span>
    ),
    header:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-span-1",
    icon: "/placeholder.svg?height=32&width=32", // Image URL
  },
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
