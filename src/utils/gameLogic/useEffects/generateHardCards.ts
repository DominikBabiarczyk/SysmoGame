import levelMediumData from '@src/assets/cardMaching/dataCards.json';
import { generateRandomNumbers } from '../functions/getNumberCard';  
import { Card } from './types';

export const generateHardCards = (): Card[] => {
  const { images } = levelMediumData.pl;

  const randomIndexes = generateRandomNumbers(8);

  const selectedImages = randomIndexes.map(index => images[index - 1]);  

  const newCards = selectedImages.flatMap((image) => [
    { id: `${image.id}-description`, flipped: false, matched: false, content: image.description, type: 'description' },
    { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
  ]);


  return newCards.sort(() => Math.random() - 0.5);
};

