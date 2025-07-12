import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types/song";
import { use, useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playHomepageSong,
    playNext,
  } = usePlayerStore();

  // Audio state
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isCurrentSong = (song: Song) => {
    return currentSong?._id === song._id;
  };

  const playSong = (song: Song) => {
    const isCurrent = currentSong?._id === song._id;
    if (isCurrent) {
      togglePlayPause();
    } else {
      playHomepageSong(song);
    }
  };

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

  // PLAYBACK CONTROLS LOGIC AND STUFF
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

   // If currentSong is null, reset time and duration
   // const handleEnded = () => {
   //   usePlayerStore.setState({ isPlaying: false });
   // };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    //audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      //audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // handle volume changes
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      // Auto-mute when volume is 0, unmute when volume > 0
      audioRef.current.muted = newVolume === 0;
    }
  };

  return {
    //audio element reference
    audioRef,

    //song controls
    playSong,
    isCurrentSong,

    //playback controls
    handleSeek,
    handleMute,
    handleVolumeChange,

    //audio state
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
  };
};
