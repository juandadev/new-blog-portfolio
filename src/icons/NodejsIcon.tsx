import * as React from 'react';
import { IconProps } from '@/types';

const NodejsIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 256 292"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M134.923 1.832C130.579 -0.611002 125.421 -0.611002 121.077 1.832L6.787 67.801C2.443 70.244 0 74.859 0 79.745V211.953C0 216.84 2.715 221.455 6.787 223.898L121.077 289.866C125.421 292.31 130.579 292.31 134.923 289.866L249.213 223.898C253.557 221.455 256 216.84 256 211.953V79.745C256 74.859 253.285 70.244 249.213 67.801L134.923 1.832Z"
      fill="url(#paint0_linear_13_44)"
    />
    <path
      d="M249.485 67.8L134.65 1.833C133.564 1.291 132.207 0.747998 131.121 0.475998L2.44299 220.912C3.52899 222.269 4.88699 223.355 6.24299 224.17L121.077 290.138C124.335 292.038 128.136 292.581 131.665 291.495L252.47 70.515C251.655 69.429 250.57 68.615 249.484 67.801L249.485 67.8Z"
      fill="url(#paint1_linear_13_44)"
    />
    <path
      d="M249.756 223.898C253.014 221.998 255.457 218.74 256.543 215.211L130.579 0.203998C127.321 -0.339002 123.792 -0.0680025 120.806 1.832L6.78601 67.53L129.765 291.768C131.393 291.496 133.294 290.953 134.923 290.138L249.756 223.899V223.898Z"
      fill="url(#paint2_linear_13_44)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_13_44"
        x1={128}
        y1={-0.00025177}
        x2={128}
        y2={291.699}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_13_44"
        x1={252}
        y1={66.5}
        x2={1.99998}
        y2={236.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="paint2_linear_13_44"
        x1={7}
        y1={68.5}
        x2={257}
        y2={217}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.365385} stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
);

export default NodejsIcon;
