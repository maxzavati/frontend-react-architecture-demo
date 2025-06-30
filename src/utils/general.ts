export function isAnyKeyTruthy(obj: Record<string, unknown>): boolean {
  for (const k in obj) if (obj[k]) return true;
  return false;
}

export function removeEmptyValues(obj: object) {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !!value)
  );
}
