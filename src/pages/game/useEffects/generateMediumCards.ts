import levelMediumData from '@src/assets/cardMaching/levelMedium.json';
import { Card } from './types';
import { generateRandomNumbers } from '../getNumberCard';  // Upewnij się, że importujesz funkcję z odpowiedniej ścieżki

export const generateMediumCards = (): Card[] => {
    const { images } = levelMediumData.pl;

    // Generowanie losowych indeksów
    const randomIndexes = generateRandomNumbers(8);
  
    // Wybieranie obrazów na podstawie losowych indeksów
    const selectedImages = randomIndexes.map(index => images[index - 1]);  // -1, ponieważ indeksy są 1-based
  const newCards = selectedImages.flatMap((image) => [
    { id: `${image.id}-image`, flipped: false, matched: false, content: image.src, type: 'image' },
    { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
  ]);

//   newCards.push(
//     { id: `${extraImage.id}-extra-image`, flipped: false, matched: false, content: extraImage.src, type: 'image' }
//   );

  return newCards.sort(() => Math.random() - 0.5);
};
