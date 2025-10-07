import * as React from 'react';
import { IconProps } from '@/types';

const DatabuddyIcon = ({ size, ...props }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 384 384"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M320 0V64H64V320H320V384H0V0H320ZM384 320H320V64H384V320ZM256 256H192V192H256V256ZM192 192H128V128H192V192Z" />
  </svg>
);

export default DatabuddyIcon;
