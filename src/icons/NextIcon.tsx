import * as React from 'react';
import { IconProps } from '@/types';

const NextIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M90 177C138.049 177 177 138.049 177 90C177 41.9512 138.049 3 90 3C41.9512 3 3 41.9512 3 90C3 138.049 41.9512 177 90 177Z"
      fill="black"
    />
    <path d="M127 54H115V126H127V54Z" fill="url(#paint0_linear_13_13)" />
    <path
      d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
      fill="url(#paint1_linear_13_13)"
    />
    <path
      d="M174 90C174 43.6081 136.392 6 90 6C43.6081 6 6 43.6081 6 90C6 136.392 43.6081 174 90 174C136.392 174 174 136.392 174 90ZM180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_13_13"
        x1={121}
        y1={54}
        x2={121}
        y2={126}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.139423} stopColor="white" />
        <stop offset={0.822115} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_13_13"
        x1={54}
        y1={54}
        x2={141}
        y2={165}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.677885} stopColor="white" />
        <stop offset={0.947115} />
      </linearGradient>
    </defs>
  </svg>
);

export default NextIcon;
