export const withLeadingZero = (value: number) => {
  const stringValue = value.toString();
  if (value < 10) return `0${stringValue}`;
  return stringValue;
};
