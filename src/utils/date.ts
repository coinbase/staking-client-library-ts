// calculateTimeDifference is a function that takes two timestamps and returns the difference in seconds.
export function calculateTimeDifference(
  timestamp1: string,
  timestamp2: string,
): number {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return Math.abs(date1.getTime() - date2.getTime()) / 1000;
}
