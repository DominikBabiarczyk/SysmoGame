import React, { useState, useEffect, useRef } from 'react';
import { useRouter, NextRouter } from 'next/router';
import Menu from "@src/pages/game/menu";
import { getSound } from '@src/utils/getSounds';
import { useAppContext } from '@src/context/completedTutorial';
import SettingsV2 from '../home/settingsBox';
import { useGameEffects } from './useEffects/useGameEffects';
import { flipCard } from './flipCard'; // Importowanie funkcji flipCard
import { Card } from './useEffects/types'; // Importowanie typu Card
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Game: React.FC = () => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRefBackground = useRef<HTMLAudioElement>(null);
  const { musicVolume, sfxVolume } = useAppContext();
  const [settingsWindow, setSettingsWindow] = useState(false);

  const router: NextRouter = useRouter();
  const { difficulty } = router.query;
  const [time, setTime] = useState<number>(() => {
    switch (difficulty) {
      case 'easy':
        return 60; // Przykładowy czas dla poziomu łatwego
      case 'medium':
        return 90; // Przykładowy czas dla poziomu średniego
      case 'hard':
        return 120; // Przykładowy czas dla poziomu trudnego
      default:
        return 66; // Domyślny czas
    }
  });

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getSound("/sounds/GameMusic.mp3", audioRefBackground, musicVolume, true);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [musicVolume]);

  const onTimeOut = () => {
    setTimeout(() => {
      router.push({
        pathname: "/afterGame/gameOver",
        query: { difficulty: difficulty }
      });
    }, 500);
  };

  useGameEffects(menuOpen, difficulty, setTime, setCards, onTimeOut);

  const handleMenu = () => {
    setMenuOpen(true);
    //clearInterval(timerRef.current!);
  };

  const handleResume = () => {
    setMenuOpen(false);
  };

  function isCardOneOfTwoFlippedAndUnmatched(cards: Card[], cardId: string): boolean {
    // Find all flipped but unmatched cards
    const flippedUnmatchedCards = cards.filter(card => card.flipped && !card.matched);
  
    // Check if there are exactly two such cards
    if (flippedUnmatchedCards.length === 2) {
      // Check if one of these cards has the given id
      return flippedUnmatchedCards.some(card => card.id === cardId);
    }
  
    return false;
  }

  return (
    <div className="bg-orange-500 flex flex-col items-center min-h-screen pb-10">
      <div className="flex justify-between w-full pt-5 pl-5 pr-5">
        <div className="bg-black text-white p-6 rounded-full text-3xl flex items-center justify-center w-40 h-40">
          {new Date(time * 1000).toISOString().substr(14, 5)}
        </div>
        <button onClick={handleMenu} className="bg-black text-white px-5 py-2 rounded-2xl shadow-3xl shadow-black w-35 h-10">{t("btn.MENU")}</button>
      </div>
      <div className='w-full h-full flex flex-col justify-start items-center'>
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              className={`w-24 h-36 bg-white border-4 ${card.matched ? 'border-green-500' : isCardOneOfTwoFlippedAndUnmatched(cards, card.id) ? ('border-red-500') : 'border-black'} rounded-lg flex items-center justify-center cursor-pointer`}
              onClick={() => flipCard(
                card.id, cards, setCards, flippedCards, setFlippedCards, setGameWon, difficulty, audioRef, sfxVolume, router
              )}
            >
              {card.flipped || card.matched ? (
                card.type === 'image' ? <img src={card.content} alt="card" className="w-fit h-fit object-cover rounded-lg" /> : <div className={`w-full h-full font-bold text-center text-black flex justify-center items-center ${card.type === 'name' ? "text-sm" : "text-xxs"}`}>{card.content}</div>
              ) : (
                <img src='/images/kardBackLogo.png' alt="card back" className="w-fit h-fit object-cover rounded-lg" />
              )}
            </div>
          ))}
        </div>
        {menuOpen &&
          (settingsWindow ?
            (<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white">
              <div className="relative w-full h-full flex flex-col text-white justify-center items-center">
                <button
                  className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-3 rounded-xl"
                  onClick={() => setSettingsWindow(false)}
                >
                  <img src="/images/backArrow.png" className="pr-1" />
                </button>
                <SettingsV2 />
              </div>
            </div>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 text-white text-4xl">
                <Menu onResume={handleResume} setSettingsWindow={setSettingsWindow} pausedTime={time} />
              </div>))
        }
      </div>

      <audio ref={audioRef} />
      <audio ref={audioRefBackground} />
    </div>
  );
};


export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth", "common"])),
    },
  };
}

export default Game;
