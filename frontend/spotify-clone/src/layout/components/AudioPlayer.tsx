import { use, useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
//TODO REFACTOR THE LOGIC HERE INTO A CUSTOM HOOK 
const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, togglePlayPause, playNext } =
    usePlayerStore();

  //handle pplay/pause logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  //handle song end logic once it ends it should go to next music automatically
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => {
      audio?.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  //handle song change logic
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    //check if new song
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChanged) {
      // If the song has changed, update the audio source and reset playback
      audio.src = currentSong?.audioUrl;
      // Reset the audio playback position to 0
      audio.currentTime = 0; 
      // Reset the previous song reference
      prevSongRef.current = currentSong?.audioUrl;
      // If the player is set to play, start playing the new song
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
