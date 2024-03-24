import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const TriangleIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       viewBox="0 0 20 20" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path
      stroke="rgb(226 232 240)"
      strokeWidth={2}
      d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z"
      fill="currentcolor"/>
  </svg>
);

export const CheckMarkIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export const LockedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2">
    <circle cx="12" cy="16" r="1"/>
    <rect x="3" y="10" width="18" height="12" rx="2"/>
    <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
  </svg>
);

export const UnLockedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2">
    <circle cx="12" cy="16" r="1"/>
    <rect width="18" height="12" x="3" y="10" rx="2"/>
    <path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>
  </svg>
);

export const UndoIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

export const XIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

export const CheckedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
    <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 11.387,0 0.561,10.811 234.191,244.996 0.561,479.174"/>
  </svg>
);


export const SkippedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
    <rect y="230" width="490" height="30"></rect>
  </svg>
);

