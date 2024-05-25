export function truncateName(fullname: string) {
  const nameParts = fullname.split(" ");
  if (nameParts.length === 1) {
    return fullname;
  }
  return `${nameParts[0]} ${nameParts[1]?.charAt(0)}.`;
}
