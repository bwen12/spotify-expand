import { usePlayerStore } from "@/stores/usePlayerStore";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SkipBack, SkipForward, Volume1, VolumeX, Volume2 } from "lucide-react";
import { CirclePlay, CirclePause } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
  const { currentSong, togglePlayPause, playNext, playPrevious, isPlaying } =
    usePlayerStore();
  
    const {
    audioRef,
    handleSeek,
    handleMute,
    handleVolumeChange,
    volume,
    currentTime,
    duration,
  } = useAudio();

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
        {/* Skip, back and play button in middle */}
        <div className="flex flex-col items-center gap-2">
          {/* This is where we put the button and we want them horizontal so flex */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <Button
              size="icon"
              variant="ghost"
              onClick={playPrevious}
              disabled={!currentSong}
              className = "hover:text-white text-zinc-400"
            >
              <SkipBack/>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlayPause}
              disabled={!currentSong}
              className = "hover:text-white text-zinc-400"
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
              className = "hover:text-white text-zinc-400"
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

        {/* Volume control on the right*/}
        <div className=" hidden sm:flex items-center justify-end gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400 flex-shrink-0"
            onClick={handleMute}
          >
            {audioRef.current?.muted || volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : volume > 65 ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <Volume1 className="h-5 w-5" />
            )}
          </Button>

          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="flex-1 max-w-[400px] hover:cursor-grab active:cursor-grabbing"
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
