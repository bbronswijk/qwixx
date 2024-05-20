import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const ChevronRightIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

export const ChevronLeftIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

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
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
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
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

export const XIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

export const CheckedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 490 490">
    <polygon
      points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 11.387,0 0.561,10.811 234.191,244.996 0.561,479.174"/>
  </svg>
);


export const SkippedIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill="currentColor" xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 490 490">
    <rect y="230" width="490" height="30"></rect>
  </svg>
);

export const CircleIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="16" cy="16" r="14"/>
  </svg>
);

export const SquareIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor"
       strokeWidth="2">
    <rect x="1" y="1" width="30" height="30" rx="5"/>
  </svg>
);


export const RotatedSquareIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor"
       strokeWidth="2">
    <path d="M6,2 A4,4 0 0,1 2,6 L2,26 A4,4 0 0,1 6,30 L26,30 A4,4 0 0,1 30,26 L30,6 A4,4 0 0,1 26,2 Z"/>
  </svg>
);


export const OctagonIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8,2 L24,2 L30,8 L30,24 L24,30 L8,30 L2,24 L2,8 L8,2 Z"/>
  </svg>
);

export const StarIcon = ({className, ...props}: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props}
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M 15.424 0.813 C 15.596 0.489 15.665 0.541 16.014 0.541 C 16.363 0.541 16.433 0.489 16.608 0.814 L 20.538 5.398 L 21.313 5.313 L 26.357 4.754 C 26.72 4.626 26.736 4.72 26.993 4.977 C 27.25 5.234 27.345 5.25 27.217 5.613 L 26.571 11.432 L 27.163 11.94 L 31.158 15.366 C 31.483 15.538 31.43 15.608 31.43 15.957 C 31.43 16.304 31.483 16.375 31.158 16.549 L 26.571 20.481 L 27.217 26.298 C 27.345 26.663 27.251 26.679 26.994 26.934 C 26.737 27.191 26.72 27.285 26.355 27.159 L 20.538 26.514 L 20.03 27.106 L 16.608 31.1 C 16.433 31.424 16.363 31.373 16.014 31.373 C 15.665 31.373 15.595 31.424 15.422 31.1 L 11.491 26.514 L 5.671 27.159 C 5.307 27.285 5.291 27.191 5.034 26.936 C 4.778 26.679 4.684 26.663 4.811 26.298 L 5.455 20.481 L 4.864 19.973 L 0.871 16.549 C 0.546 16.375 0.598 16.304 0.598 15.957 C 0.598 15.608 0.548 15.538 0.871 15.366 L 5.455 11.432 L 4.811 5.614 C 4.684 5.25 4.778 5.234 5.034 4.977 C 5.291 4.72 5.308 4.626 5.671 4.754 L 11.491 5.398 L 11.999 4.807 L 15.424 0.813 Z"/>
  </svg>
);
