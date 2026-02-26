"use client";

import { motion, useReducedMotion } from "framer-motion";

const PATHS = [
  "M421,307Q403,364,352,393Q301,422,243,420Q185,418,144,375Q103,332,89,272Q75,212,102,159Q129,106,186,82Q243,58,304,73Q365,88,404,140Q443,192,439,249Q435,306,421,307Z",
  "M431,292Q410,334,377,370Q344,406,296,425Q248,444,200,427Q152,410,123,369Q94,328,78,274Q62,220,89,164Q116,108,171,84Q226,60,285,73Q344,86,383,132Q422,178,438,227Q454,276,431,292Z",
  "M405,324Q383,398,307,420Q231,442,171,402Q111,362,92,292Q73,222,105,163Q137,104,199,83Q261,62,322,77Q383,92,405,160Q427,228,414,276Q401,324,405,324Z",
];

export default function MorphBlob() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 500 500" className="h-full w-full">
      <motion.path
        d={PATHS[0]}
        animate={reduce ? { d: PATHS[0] } : { d: PATHS }}
        transition={
          reduce
            ? undefined
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
        fill="rgba(249,115,22,0.16)"
      />
    </svg>
  );
}