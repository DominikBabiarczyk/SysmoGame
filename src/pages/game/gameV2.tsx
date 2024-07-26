import React, { useState, useEffect } from 'react';
import { generatePairs } from './getRandomPairs';
import { generateRandomNumbers } from './getNumberCard';

const game: React.FC = () => {
  const [time, setTime] = useState(0);


  const [cards, setCards] = useState<Array<{ id: number, flipped: boolean, image: string }>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pairs = generatePairs();
    const chosenCard = generateRandomNumbers();
    const images = chosenCard.map(num => `/images/cards/frontPicture/card${num}.png`);
    
    // Create cards based on pairs
    const newCards = pairs.flatMap(([first, second], index) => [
      { id: first, flipped: false, image: images[index] },
      { id: second, flipped: false, image: images[index] }
    ]);

    newCards.pop();
    
    setCards(newCards);
  }, []);

  const flipCard = (id: number) => {
    setCards(cards.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
  };

  return (
    <div className="bg-orange-500 h-screen flex flex-col items-center">
        <div className="flex justify-between w-full p-10">
            <div className="bg-black text-white p-6 rounded-full text-3xl flex items-center justify-center w-40 h-40">
                {new Date(time * 1000).toISOString().substr(14, 5)}
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-2xl shadow-3xl shadow-black h-20 h-10">MENU</button>
        </div>
        <div className='w-full h-full flex flex=col justify-center items-center'>
            <div className="grid grid-cols-5 gap-4">
                {cards.map(card => (
                <div 
                    key={card.id} 
                    className={`w-24 h-36 bg-white border-4 ${card.flipped ? 'border-green-500' : 'border-black'} rounded-lg flex items-center justify-center cursor-pointer`} 
                    onClick={() => flipCard(card.id)}
                >
                    {card.flipped ? <img src={card.image} alt="card" className="w-fit h-fit object-cover rounded-lg" /> : <img src='/images/kardBackLogo.png'/>}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default game;
