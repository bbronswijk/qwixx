import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export const LoaderIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
);

export const BugIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m8 2 1.88 1.88' />
    <path d='M14.12 3.88 16 2' />
    <path d='M9 7.13v-1a3.003 3.003 0 1 1 6 0v1' />
    <path d='M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6' />
    <path d='M12 20v-9' />
    <path d='M6.53 9C4.6 8.8 3 7.1 3 5' />
    <path d='M6 13H2' />
    <path d='M3 21c0-2.1 1.7-3.9 3.8-4' />
    <path d='M20.97 5c0 2.1-1.6 3.8-3.5 4' />
    <path d='M22 13h-4' />
    <path d='M17.2 17c2.1.1 3.8 1.9 3.8 4' />
  </svg>
);

export const GamePadIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='6' x2='10' y1='11' y2='11' />
    <line x1='8' x2='8' y1='9' y2='13' />
    <line x1='15' x2='15.01' y1='12' y2='12' />
    <line x1='18' x2='18.01' y1='10' y2='10' />
    <path d='M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z' />
  </svg>
);

export const ChevronLeftIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m15 18-6-6 6-6' />
  </svg>
);

export const EyeOffIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M9.88 9.88a3 3 0 1 0 4.24 4.24' />
    <path d='M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' />
    <path d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61' />
    <line x1='2' x2='22' y1='2' y2='22' />
  </svg>
);

export const EyeIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
    <circle cx='12' cy='12' r='3' />
  </svg>
);

export const TriangleIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      stroke='rgb(226 232 240)'
      strokeWidth={2}
      d='M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z'
      fill='currentcolor'
    />
  </svg>
);

export const CheckMarkIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
);

export const UnLockedIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='12' cy='16' r='1' />
    <rect width='18' height='12' x='3' y='10' rx='2' />
    <path d='M7 10V7a5 5 0 0 1 9.33-2.5' />
  </svg>
);

export const UndoIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg
    className={cn(className)}
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
    <path d='M3 3v5h5' />
  </svg>
);

export const XIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round'>
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);

export const CheckedIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 490 490'>
    <polygon points='11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 11.387,0 0.561,10.811 234.191,244.996 0.561,479.174' />
  </svg>
);

export const SkippedIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 490 490'>
    <rect y='230' width='490' height='30'></rect>
  </svg>
);

export const CircleIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='16' cy='16' r='14' />
  </svg>
);

export const DottedCircleIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='16' cy='16' r='14' strokeDasharray='1,4' strokeLinecap='square' />
  </svg>
);

export const SquareIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <rect x='1' y='1' width='30' height='30' rx='5' />
  </svg>
);

export const RotatedSquareIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M6,2 A4,4 0 0,1 2,6 L2,26 A4,4 0 0,1 6,30 L26,30 A4,4 0 0,1 30,26 L30,6 A4,4 0 0,1 26,2 Z' />
  </svg>
);

export const OctagonIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M8,2 L24,2 L30,8 L30,24 L24,30 L8,30 L2,24 L2,8 L8,2 Z' />
  </svg>
);

export const StarIcon = ({ className, ...props }: HTMLAttributes<SVGSVGElement>) => (
  <svg className={cn(className)} {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='2'>
    <path d='M 15.424 0.813 C 15.596 0.489 15.665 0.541 16.014 0.541 C 16.363 0.541 16.433 0.489 16.608 0.814 L 20.538 5.398 L 21.313 5.313 L 26.357 4.754 C 26.72 4.626 26.736 4.72 26.993 4.977 C 27.25 5.234 27.345 5.25 27.217 5.613 L 26.571 11.432 L 27.163 11.94 L 31.158 15.366 C 31.483 15.538 31.43 15.608 31.43 15.957 C 31.43 16.304 31.483 16.375 31.158 16.549 L 26.571 20.481 L 27.217 26.298 C 27.345 26.663 27.251 26.679 26.994 26.934 C 26.737 27.191 26.72 27.285 26.355 27.159 L 20.538 26.514 L 20.03 27.106 L 16.608 31.1 C 16.433 31.424 16.363 31.373 16.014 31.373 C 15.665 31.373 15.595 31.424 15.422 31.1 L 11.491 26.514 L 5.671 27.159 C 5.307 27.285 5.291 27.191 5.034 26.936 C 4.778 26.679 4.684 26.663 4.811 26.298 L 5.455 20.481 L 4.864 19.973 L 0.871 16.549 C 0.546 16.375 0.598 16.304 0.598 15.957 C 0.598 15.608 0.548 15.538 0.871 15.366 L 5.455 11.432 L 4.811 5.614 C 4.684 5.25 4.778 5.234 5.034 4.977 C 5.291 4.72 5.308 4.626 5.671 4.754 L 11.491 5.398 L 11.999 4.807 L 15.424 0.813 Z' />
  </svg>
);
