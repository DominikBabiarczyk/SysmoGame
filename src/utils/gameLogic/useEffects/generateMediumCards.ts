import levelMediumData from '@src/assets/cardMaching/dataCards.json';
import { Card } from './types';
import { generateRandomNumbers } from '../functions/getNumberCard';  

export const generateMediumCards = (): Card[] => {
    const { images } = levelMediumData.pl;


    const randomIndexes = generateRandomNumbers(8);

    const selectedImages = randomIndexes.map(index => images[index - 1]);  
  const newCards = selectedImages.flatMap((image) => [
    { id: `${image.id}-image`, flipped: false, matched: false, content: image.src, type: 'image' },
    { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
  ]);


  return newCards.sort(() => Math.random() - 0.5);
};
