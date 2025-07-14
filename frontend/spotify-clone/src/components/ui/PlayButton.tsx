import type { Song } from "@/types/song";
import { CirclePlay, CirclePause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/useAudio";

const PlayButton = ({ song }: { song: Song }) => {
  const { playSong, isCurrentSong, isPlaying } = useAudio();
  const isCurrent = isCurrentSong(song);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    playSong(song);
  };

  return (
    <Button
      onClick={handleClick}
      className={`
        h-8 w-8 p-3 bg-green-500 hover:bg-green-400 rounded-full cursor-pointer
        hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0
        ${
          isCurrent && isPlaying
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }
      `}
    >
      {isCurrent && isPlaying ? (
        <CirclePause className="h-5 w-5 text-white" />
      ) : (
        <CirclePlay className="h-5 w-5 text-white" />
      )}
    </Button>
  );
};

export default PlayButton;
