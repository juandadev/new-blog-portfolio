import * as React from 'react';
import { IconProps } from '@/types';

const NextjsIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 96 111"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M95.508 103.52L15.142 1.52588e-05H0V71.97H12.1136V15.3836L85.999 110.845C89.333 108.614 92.509 106.165 95.508 103.52Z"
      fill="url(#paint0_linear_382_408)"
    />
    <path
      d="M73 1.52588e-05H61V72H73V1.52588e-05Z"
      fill="url(#paint1_linear_382_408)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_382_408"
        x1={55}
        y1={62.5}
        x2={90.5}
        y2={106.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_382_408"
        x1={67}
        y1={0.0000152588}
        x2={66.799}
        y2={52.875}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

export default NextjsIcon;
