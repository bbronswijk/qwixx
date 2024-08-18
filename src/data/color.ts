export const rows = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd'
} as const;

export type Row = keyof typeof rows;

export const colors = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue'
} as const;

export type Color = keyof typeof colors;

export const getColorClasses = (color: Color) => {
  switch (color) {
    case colors.red:
      return 'bg-red-800 text-red-800';
    case colors.yellow:
      return 'bg-yellow-500 text-yellow-600';
    case colors.green:
      return 'bg-green-700 text-green-700';
    case colors.blue:
      return 'bg-blue-800 text-blue-800';
  }
}

export const colorToRow = (color: Color): Row => {
  switch (color) {
    case colors.red:
      return rows.a;
    case colors.yellow:
      return rows.b;
    case colors.green:
      return rows.c;
    case colors.blue:
      return rows.d;
  }
}

export const rowToColor = (row: Row): Color => {
  switch (row) {
    case rows.a:
      return colors.red;
    case rows.b:
      return colors.yellow;
    case rows.c:
      return colors.green;
    case rows.d:
      return colors.blue;
  }
}