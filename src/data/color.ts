export const colors = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue'
} as const;

export type Color = keyof typeof colors;