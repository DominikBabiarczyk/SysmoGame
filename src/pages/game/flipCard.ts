import { NextRouter } from 'next/router';
import { Card } from './useEffects/types';
import { EqualsId } from './equalsId';
import { getSound } from '@src/utils/getSounds';

export const flipCard = (
  id: string,
  cards: Card[],
  setCards: (cards: Card[]) => void,
  flippedCards: string[],
  setFlippedCards: (flippedCards: string[]) => void,
  setGameWon: (gameWon: boolean) => void,
  difficulty: string | string[] | undefined,
  audioRef: React.RefObject<HTMLAudioElement>,
  sfxVolume: number,
  router: NextRouter
) => {


  if (flippedCards.includes(id) || cards.find(card => card.id === id)?.matched) {
    return;
  }

  const newFlippedCards = [...flippedCards, id];

  if (newFlippedCards.length > 2) {
    return;
  }

  setFlippedCards(newFlippedCards);

  const newSetCards = cards.map(card =>
    card.id === id ? { ...card, flipped: true } : card
  )

  setCards(newSetCards);

  if (newFlippedCards.length === 2) {
    const [firstId, secondId] = newFlippedCards;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    let isFindMatch: boolean = false;
    if (firstCard && secondCard) {
      if (difficulty === 'easy') {
        isFindMatch = firstCard.content !== secondCard.content;
      } else {
        isFindMatch = !EqualsId(firstCard.id, secondCard.id);
      }
    }

    if (isFindMatch) {
      getSound("/sounds/BadCard.mp3", audioRef, sfxVolume);
      setTimeout(() => {
        setCards(cards.map(card =>
          card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card
        ));
        setFlippedCards([]);
      }, 1000);
    } else if (firstCard && secondCard) {
      getSound("/sounds/CorrectCard.mp3", audioRef, sfxVolume);
      setCards(cards.map(card =>
        card.id === firstId || card.id === secondId ? { ...card, matched: true, flipped: true } : card
      ));
      setFlippedCards([]);
    }
  }

  if (newSetCards.every(card => card.flipped)) {
    setGameWon(true);
    setTimeout(() => {
      router.push({
        pathname: "/afterGame/win/passingCode",
        query: { difficulty: difficulty }
      });
    }, 500); // small delay to allow final card to be seen
  }
};
