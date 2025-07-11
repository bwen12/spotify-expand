import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types/song";
import { CirclePlay, Pause, Play, CirclePause } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlayPause } =
    usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <Button
      onClick={handlePlay}
      className={`
        h-8 w-8 p-3 bg-green-500 hover:bg-green-400 rounded-full cursor-pointer
        hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0
        ${
          isCurrentSong && isPlaying
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }
      `}
    >
      {isCurrentSong && isPlaying ? (
        <CirclePause className="h-5 w-5 text-white" />
      ) : (
        <CirclePlay className="h-5 w-5 text-white" />
      )}
    </Button>
  );
};

export default PlayButton;
