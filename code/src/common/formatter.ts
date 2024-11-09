export const withLeadingZero = (value: number, places: number = 2) =>
  String(value).padStart(places, '0');
