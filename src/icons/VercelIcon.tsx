import * as React from 'react';
import { IconProps } from '@/types';

const VercelIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 256 222"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M128 0L256 221.705H0L128 0Z" />
  </svg>
);

export default VercelIcon;
