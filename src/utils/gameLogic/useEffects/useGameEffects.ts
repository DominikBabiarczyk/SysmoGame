import { useEffect, useRef } from 'react';
import { getSound } from '@src/utils/getSounds';
import { useAppContext } from '@src/context/completedTutorial';
import { generateHardCards } from './generateHardCards';
import { generateMediumCards } from './generateMediumCards';
import { generateEasyCards } from './generateEasyCards';
import { Card } from './types';

export const useGameEffects = (
  menuOpen: boolean, 
  difficulty: string | string[] | undefined, 
  setTime: (time: (prevTime: number) => number) => void, 
  setCards: (cards: Card[]) => void, 
  onTimeOut: () => void
) => {
  const audioRefBackground = useRef<HTMLAudioElement>(null);
  const { musicVolume } = useAppContext();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getSound("/sounds/GameMusic.mp3", audioRefBackground, musicVolume, true);

    return () => {
      if (audioRefBackground.current) {
        audioRefBackground.current.pause();
        audioRefBackground.current.currentTime = 0;
      }
    };
  }, [musicVolume]);

  useEffect(() => {
    // if (!menuOpen) {     zatrzymuj kiedy menu
      timerRef.current = setInterval(() => {
        setTime((prevTime: number) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerRef.current!);
            onTimeOut();
            return 0;
          }
        });
      }, 1000);
    // }

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [menuOpen, setTime, onTimeOut]);

  useEffect(() => {
    let newCards: Card[];

    switch (difficulty) {
      case 'hard':
        newCards = generateHardCards();
        break;
      case 'medium':
        newCards = generateMediumCards();
        break;
      default:
        newCards = generateEasyCards();
    }

    setCards(newCards);
  }, [difficulty, setCards]);
};
