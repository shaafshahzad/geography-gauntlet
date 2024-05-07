export function formatTime(time: string) {
  const minutes = Math.floor(Number(time) / 60);
  const seconds = Number(time) % 60;
  return `${minutes}:${seconds}`;
}
