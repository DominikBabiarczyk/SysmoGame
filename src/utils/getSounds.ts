import { MutableRefObject } from 'react';
import { useAppContext } from '@src/context/completedTutorial';

// const { musicVolume } = useAppContext();
// const {sfxVolume} = useAppContext();
export const getSound = (pathSounds :string, audioRef: MutableRefObject<HTMLAudioElement | null>, volume:number, loop:boolean = false):void => {
    if (audioRef.current) {
        audioRef.current.src = pathSounds;
        audioRef.current.loop = loop;
        audioRef.current.volume = volume/100;
        audioRef.current.play();
    }
};


  
