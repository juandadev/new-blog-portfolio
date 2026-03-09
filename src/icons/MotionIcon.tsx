import * as React from 'react';
import { IconProps } from '@/types';

const MotionIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 229 80"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M86.5536 0L41.2616 80H0L35.3656 17.533C40.8478 7.84982 54.5285 0 65.9228 0H86.5536ZM187.738 20C187.738 8.95421 196.975 0 208.369 0C219.763 0 229 8.95421 229 20C229 31.0456 219.763 40 208.369 40C196.975 40 187.738 31.0456 187.738 20ZM94.2901 0H135.552L90.2597 80H48.9981L94.2901 0ZM143.023 0H184.285L148.919 62.467C143.437 72.1502 129.756 80 118.362 80H97.7314L143.023 0Z" />
  </svg>
);

export default MotionIcon;
