import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "../skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import { useAudio } from "@/hooks/useAudio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useEffect } from "react";
const FeaturedSection = () => {
  const { songs, isLoading, error } = useMusicStore();
  const { playSong } = useAudio();
  const nextRef = useRef<HTMLButtonElement>(null);
  
  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (nextRef.current) {
        nextRef.current.click();
      }
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);
  
  if (isLoading) {
    return <FeaturedGridSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full  py-6">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {songs.map((song) => (
            <CarouselItem
              key={song._id}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4 px-2"
            >
              <div
                className="group bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors cursor-pointer p-4 relative shadow-lg"
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
                  <p className="text-sm text-zinc-400 truncate">
                    {song.artist}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!bg-emerald-500 absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
        <CarouselNext ref={nextRef} className="!bg-emerald-500 absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default FeaturedSection;
