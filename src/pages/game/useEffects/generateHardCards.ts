import levelMediumData from '@src/assets/cardMaching/levelMedium.json';
import { generateRandomNumbers } from '../getNumberCard';  // Upewnij się, że importujesz funkcję z odpowiedniej ścieżki
import { Card } from './types';

export const generateHardCards = (): Card[] => {
  const { images } = levelMediumData.pl;

  // Generowanie losowych indeksów
  const randomIndexes = generateRandomNumbers(8);

  // Wybieranie obrazów na podstawie losowych indeksów
  const selectedImages = randomIndexes.map(index => images[index - 1]);  // -1, ponieważ indeksy są 1-based

  const newCards = selectedImages.flatMap((image) => [
    { id: `${image.id}-description`, flipped: false, matched: false, content: image.description, type: 'description' },
    { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
  ]);

  // Zakomentowane dodanie dodatkowej karty
  // newCards.push(
  //   { id: `${extraImage.id}-extra-image`, flipped: false, matched: false, content: extraImage.name, type: 'name' }
  // );

  return newCards.sort(() => Math.random() - 0.5);
};

