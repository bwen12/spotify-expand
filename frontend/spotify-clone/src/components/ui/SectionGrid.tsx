import type { Song } from "@/types/song";
import SectionGridSkeleton from "../skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import { useAudio } from "@/hooks/useAudio";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading?: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  const { playSong } = useAudio();
  if (isLoading) {
    return <SectionGridSkeleton />;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-300 hover:text-white"
        >
          Show All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer p-4"
            onClick={() => playSong(song)}
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute mb-1 right-2 bottom-2">
                <PlayButton song={song} />
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold truncate mb-2">
                {song.title}
              </h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
