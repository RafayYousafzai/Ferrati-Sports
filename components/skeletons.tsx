"use client";
import { motion } from "framer-motion";

// Problem Skeletons
export const SkeletonProblemOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full h-4 bg-red-400 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-3/4 h-4 bg-red-300 rounded-full ml-auto"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full h-4 bg-red-400 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-1/2 h-4 bg-red-300 rounded-full"
      />
    </div>
  );
};

export const SkeletonProblemTwo = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: -10,
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center"
    >
      <div className="text-6xl text-red-500">⏰</div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Delayed
      </p>
    </motion.div>
  );
};

export const SkeletonProblemThree = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 border-4 border-red-500 rounded-lg flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl text-red-500"
        >
          🚫
        </motion.div>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Limited Options
      </p>
    </div>
  );
};

export const SkeletonProblemFour = () => {
  const variants = {
    initial: { opacity: 0.2 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as "reverse",
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gray-900 flex-col items-center justify-center text-white"
    >
      <div className="text-6xl">❓</div>
      <p className="text-sm text-neutral-400 mt-2">No Updates</p>
    </motion.div>
  );
};

export const SkeletonProblemFive = () => {
  const variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 5,
      transition: {
        duration: 0.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as "reverse",
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center"
    >
      <div className="text-6xl text-orange-500">💸</div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Hidden Costs
      </p>
    </motion.div>
  );
};

// Solution Skeletons
export const SkeletonSolutionOne = () => {
  const variants = {
    initial: { height: "100%" },
    animate: { height: "20%", transition: { duration: 1, delay: 0.5 } },
  };
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-end p-4">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className="w-full bg-green-500 rounded-t-lg"
      />
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Fewer Returns
      </p>
    </div>
  );
};

export const SkeletonSolutionTwo = () => {
  const variants = {
    initial: { width: "0%" },
    animate: { width: "100%", transition: { duration: 1.5, ease: "easeOut" } },
  };
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center p-4">
      <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Faster Production
      </p>
    </div>
  );
};

export const SkeletonSolutionThree = () => {
  const variants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        className="text-6xl text-green-500"
      >
        😊
      </motion.div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Happy Clients
      </p>
    </div>
  );
};

export const SkeletonSolutionFour = () => {
  const variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col items-center justify-center"
    >
      <div className="text-6xl text-purple-500">✨</div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        Creative Freedom
      </p>
    </motion.div>
  );
};
