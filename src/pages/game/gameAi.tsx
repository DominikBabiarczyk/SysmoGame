import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Menu from "@src/pages/game/menu";
import levelMediumData from '@src/assets/cardMaching/levelMedium.json';
import { generatePairs } from './getRandomPairs';
import { generateRandomNumbers } from './getNumberCard';
import { EqualsId } from './equalsId';
import { getSound } from '@src/utils/getSounds';
import { useAppContext } from '@src/context/completedTutorial';
import SettingsV2 from '../home/settingsBox';
import { useGameEffects } from './useEffects/useGameEffects'; 

type Card = {
    id: string;
    flipped: boolean;
    matched: boolean;
    content: string;
    type: string;
  };
  

const Game: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRefBackground = useRef<HTMLAudioElement>(null);
    const { musicVolume } = useAppContext();
    const {sfxVolume} = useAppContext();
    const [settingsWindow, setSettingsWindow] = useState(false);


    const router = useRouter();
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

    const [cards, setCards] = useState<Array<{ id: string, flipped: boolean, matched: boolean, content: string, type: string }>>([]);
    const [flippedCards, setFlippedCards] = useState<Array<string>>([]);
    const [gameWon, setGameWon] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);


    

  useEffect(() => {
    getSound("/sounds/GameMusic.mp3", audioRefBackground, musicVolume, true)

    // Funkcja czyszcząca, zatrzymująca muzykę przy odmontowywaniu komponentu
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [musicVolume]);



    // useEffect(() => {
    //     if (!menuOpen) {
    //     timerRef.current = setInterval(() => {
    //         setTime(prevTime => {
    //             if (prevTime > 0) {
    //                 return prevTime - 1;
    //             } else {
    //                 clearInterval(timerRef.current!);
    //                 onTimeOut();
    //                 return 0;
    //             }
    //         });
    //     }, 1000);
    //     }

    //     return () => {
    //         clearInterval(timerRef.current!);
    //     };
    // }, [menuOpen]);

    // useEffect(() => {
    //     if (difficulty ==='hard'){
    //         const { images } = levelMediumData.pl;

    //         const selectedImages = images.slice(0, 7);
    //         const extraImage = images[7];

    //         const newCards = selectedImages.flatMap((image) => [
    //             { id: `${image.id}-description`, flipped: false, matched: false, content: image.description, type: 'description' },
    //             { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
    //         ]);

    //         newCards.push(
    //             { id: `${extraImage.id}-extra-image`, flipped: false, matched: false, content: extraImage.name, type: 'name' }
    //         );

    //         const shuffledCards = newCards.sort(() => Math.random() - 0.5);
    //         setCards(shuffledCards);

    // }else if (difficulty === 'medium') {
    //     const { images } = levelMediumData.pl;

    //     const selectedImages = images.slice(0, 7);
    //     const extraImage = images[7];

    //     const newCards = selectedImages.flatMap((image) => [
    //         { id: `${image.id}-image`, flipped: false, matched: false, content: image.src, type: 'image' },
    //         { id: `${image.id}-name`, flipped: false, matched: false, content: image.name, type: 'name' }
    //     ]);

    //     newCards.push(
    //         { id: `${extraImage.id}-extra-image`, flipped: false, matched: false, content: extraImage.src, type: 'image' }
    //     );

    //     const shuffledCards = newCards.sort(() => Math.random() - 0.5);
    //     setCards(shuffledCards);
    // } else {
    //     const pairs = generatePairs();
    //     const chosenCard = generateRandomNumbers();
    //     const images = chosenCard.map(num => `/images/cards/frontPicture/card${num}.png`);

    //     let newCards = pairs.flatMap(([first, second], index) => [
    //         { id: `${first}`, flipped: false, matched: false, content: images[index], type: 'image' },
    //         { id: `${second}`, flipped: false, matched: false, content: images[index], type: 'image' }
    //     ]);

    //     newCards = newCards.slice(0, 14);
    //     newCards.push({ id: `${pairs[7][0]}`, flipped: false, matched: false, content: images[7], type: 'image' });

    //     const shuffledCards = newCards.sort(() => Math.random() - 0.5);
    //     setCards(shuffledCards);
    // }
    // }, [difficulty]);




    const onTimeOut = () => {
        setTimeout(() => {
            router.push({
                pathname:"/afterGame/gameOver",
                query: {difficulty: difficulty}
            });
          }, 500);
        
    };

    useGameEffects(menuOpen, difficulty, setTime, setCards, onTimeOut);

    const flipCard = (id: string) => {
    if (cards.every(card => card.flipped )) {
        setGameWon(true);
        setTimeout(() => {
          router.push({
            pathname:"/afterGame/win/passingCode",
            query:{difficulty: difficulty}

          });
        }, 500); // small delay to allow final card to be seen
      }

    if (flippedCards.includes(id) || cards.find(card => card.id === id)?.matched) {
        return;
        }

        const newFlippedCards = [...flippedCards, id];

        if (newFlippedCards.length > 2) {
        return;
        }

        setFlippedCards(newFlippedCards);

        setCards(cards.map(card =>
        card.id === id ? { ...card, flipped: true } : card
        ));

        if (newFlippedCards.length === 2) {
            const [firstId, secondId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);

            let isFindMatch: boolean = false
            if (firstCard && secondCard){ 
            if(difficulty === 'easy' ){
                isFindMatch = firstCard.content !== secondCard.content;
            }else{
                isFindMatch = !EqualsId(firstCard.id, secondCard.id)
            }
        }
            if (isFindMatch ){
                getSound("/sounds/BadCard.mp3", audioRef, sfxVolume )
                setTimeout(() => {
                setCards(cards.map(card =>
                    card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card
                ));
                setFlippedCards([]);
                }, 1000);
            } else if (firstCard && secondCard) {
                getSound("/sounds/CorrectCard.mp3", audioRef, sfxVolume)
                setCards(cards.map(card =>
                card.id === firstId || card.id === secondId ? { ...card, matched: true, flipped: true } : card
                ));
                setFlippedCards([]);
            }
        }
    };

    const handleMenu = () => {
        setMenuOpen(true);
        clearInterval(timerRef.current!);
    };

    const handleResume = () => {
        setMenuOpen(false);
    };


    return (
        <div className="bg-orange-500 h-screen flex flex-col items-center">
            <div className="flex justify-between w-full p-10">
                <div className="bg-black text-white p-6 rounded-full text-3xl flex items-center justify-center w-40 h-40">
                {new Date(time * 1000).toISOString().substr(14, 5)}
                </div>
                <button onClick={handleMenu} className="bg-black text-white px-5 py-2 rounded-2xl shadow-3xl shadow-black h-20 h-10">MENU</button>
            </div>
            <div className='w-full h-full flex flex-col justify-start pt-20 items-center'>
                <div className="grid grid-cols-5 gap-4">
                {cards.map(card => (
                    <div
                    key={card.id}
                    className={`w-24 h-36 bg-white border-4 ${card.matched ? 'border-green-500' : card.flipped ? 'border-red-500' : 'border-black'} rounded-lg flex items-center justify-center cursor-pointer`}
                    onClick={() => flipCard(card.id)}
                    >
                        {card.flipped || card.matched ? (
                            card.type === 'image' ? <img src={card.content} alt="card" className="w-fit h-fit object-cover rounded-lg" /> :   <div className={`w-full h-full font-bold text-center text-black flex justify-center items-center ${card.type === 'name' ? "text-base" : "text-xs"}`}>{card.content}</div>
                        ) : (
                            <img src='/images/kardBackLogo.png' alt="card back" className="w-fit h-fit object-cover rounded-lg" />
                        )}
                    </div>
                ))}
                </div>
                {menuOpen && 
                    (settingsWindow ? 
                    (<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white">
                        <div className="relative w-full h-full  flex flex-col text-white justify-center items-center">
                            <button
                            className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-3 rounded-xl"
                            onClick={() => setSettingsWindow(false)} // assuming handleMenu toggles menuOpen state
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

            <audio ref={audioRef}/>
            <audio ref={audioRefBackground}/>
            
        </div>
    );
};

export default Game;
