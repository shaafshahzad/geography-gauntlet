export function formatTime(time: string | number) {
  const minutes = Math.floor(Number(time) / 60);
  const seconds = Number(time) % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
