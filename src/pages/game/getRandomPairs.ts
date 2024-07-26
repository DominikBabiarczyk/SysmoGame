// getRandomPairs.ts
export const generatePairs = (): [number, number][] => {
    // Create an array with numbers from 1 to 16
    const numbers = Array.from({ length: 16 }, (_, i) => i + 1);
  
    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // Create pairs
    const pairs: [number, number][] = [];
    for (let i = 0; i < numbers.length; i += 2) {
      pairs.push([numbers[i], numbers[i + 1]]);
    }
  
    return pairs;
  };