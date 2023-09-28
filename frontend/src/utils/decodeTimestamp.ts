export default function decodeTimestamp(timestamp: string): string {
  const [seconds] = timestamp.split(".").map(Number);
  const date = new Date(seconds * 1000);
  return date.toLocaleString();
}
