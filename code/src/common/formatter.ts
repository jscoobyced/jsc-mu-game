export const withLeadingZero = (value: number, places = 2) =>
  String(value).padStart(places, '0')
