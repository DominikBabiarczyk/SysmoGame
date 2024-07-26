import React, { useRef } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePlaySound}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Play Sound
      </button>
      <audio ref={audioRef} src="/BadCard.mp3" />
    </div>
  );
};

export default AudioPlayer;
