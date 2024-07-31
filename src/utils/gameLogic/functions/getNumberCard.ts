// getRandomNumbers.ts
export const generateRandomNumbers = (quantityNumber: number = 8): number[] => {
    // Create an array with numbers from 1 to 20
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  
    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // Select the first 16 numbers
    return numbers.slice(0, quantityNumber);
  };
  