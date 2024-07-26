export function formatFollowers(number: number) {
  if (number < 1000) {
    return number.toString();
  } else {
    return (number / 1000).toFixed(0) + 'k';
  }
}
