import * as React from 'react';
import { IconProps } from '@/types';

const SupabaseIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 469 483"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M274.118 474.319C261.814 489.806 236.867 481.321 236.571 461.545L232.236 172.305H426.805C462.047 172.305 481.702 212.992 459.788 240.58L274.118 474.319Z"
      fill="url(#paint0_linear_13_94)"
    />
    <path
      d="M194.988 8.90732C207.292 -6.58188 232.239 1.90508 232.535 21.6808L234.435 310.92H42.3009C7.05812 310.92 -12.5974 270.234 9.31759 242.645L194.988 8.90732Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_13_94"
        x1={387}
        y1={327}
        x2={189}
        y2={128.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.331731} stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
);

export default SupabaseIcon;
