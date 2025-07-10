import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "../skeletons/FeaturedGridSkeleton";

const FeaturedSection = () => {
  const { featuredSongs, isLoading, error } = useMusicStore();

  if (isLoading) {
    return <FeaturedGridSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors grou cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4">
            <h3 className="text-white font-semibold truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>
        //To Do add play button
      ))}
    </div>
  );
};

export default FeaturedSection;
