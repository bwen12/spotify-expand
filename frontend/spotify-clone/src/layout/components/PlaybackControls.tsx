import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SkipBack, SkipForward } from "lucide-react";
import PlayButton from "@/components/ui/PlayButton";
import { CirclePlay, CirclePause } from "lucide-react";
import { formatDuration } from "@/pages/AlbumPage";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

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
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  // handle volume changes
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-16 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="grid grid-cols-3 items-center h-full">
        {/* current playing song info */}
        <div className="hidden sm:flex items-center gap-5 min-w-[180px]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />

              <div className="flex flex-col min-w-0">
                <div className="font-medium truncate cursor-pointer hover:underline">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate cursor-pointer hover:underline">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* We want the play button, foward button, back button, etc to stack on top of the slider so flex flex-col */}
        <div className="flex flex-col items-center gap-2">
          {/* This is where we put the button and we want them horizontal so flex */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <Button
              size="icon"
              variant="ghost"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-7 w-7" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlayPause}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <CirclePause className="h-7 w-7" />
              ) : (
                <CirclePlay className="h-7 w-7" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-7 w-7" />
            </Button>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-4 w-full">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="flex-1 hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400 min-w-[40px]">
              {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
