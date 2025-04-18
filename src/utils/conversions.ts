export const parseWidth = (value: string | number, base: number): number => {
  if (typeof value === 'string' && value.endsWith('%')) {
    const percent = parseFloat(value.slice(0, -1));
    return (percent / 100) * base;
  }
  return typeof value === 'number' ? value : 0;
}
