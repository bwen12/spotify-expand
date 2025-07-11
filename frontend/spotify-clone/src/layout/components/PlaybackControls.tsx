import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";

const PlaybackControls = () => {
  const { currentSong, togglePlayPause, playNext, playPrevious, isPlaying } =
    usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    }
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // handle volume changes
  const handleSeek = (value:number[]) => {
    if (audioRef.current){
        audioRef.current.currentTime = value[0]
    }
  }

  return (
    <footer className = "h-15 sm:h-24 bg-zinc-900 border-t border-zinc-800 px4">
        <div className = "flex items-center justify-between h-full">
           {/* current playing song info */}
        
        
        </div>

    </footer>
  );
};

export default PlaybackControls;
