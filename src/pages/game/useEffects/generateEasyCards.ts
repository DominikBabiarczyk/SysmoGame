import { generatePairs } from '../getRandomPairs';
import { generateRandomNumbers } from '../getNumberCard';
import { Card } from './types';

export const generateEasyCards = (): Card[] => {
  const pairs = generatePairs();
  const chosenCard = generateRandomNumbers(8);
  const images = chosenCard.map(num => `/images/cards/frontPicture/card${num}.png`);

  let newCards = pairs.flatMap(([first, second], index) => [
    { id: `${first}`, flipped: false, matched: false, content: images[index], type: 'image' },
    { id: `${second}`, flipped: false, matched: false, content: images[index], type: 'image' }
  ]);

  newCards = newCards.slice(0, 12);
  //newCards.push({ id: `${pairs[7][0]}`, flipped: false, matched: false, content: images[7], type: 'image' });

  return newCards.sort(() => Math.random() - 0.5);
};
