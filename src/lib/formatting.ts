export function formatName(str: string) {
  str = str.trim();
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
