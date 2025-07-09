import { Link } from "react-router-dom";
import { HomeIcon, MessageCircle, Library, Play } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  //so now we fetched the albums from the store useMusicStore
  // (this is essentially a custom hook that uses Zustand for state management)
  // and now the data is stored as "albums"

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Home, etc */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-3">
          <Link
            to={"/"}
            className="flex items-center justify-start p-3 rounded-lg text-white hover:text-green-500 hover:bg-zinc-800/50 transition-all duration-200 group relative"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="ml-3 font-bold hidden md:inline">Home</span>
            {/* basically if the "Home" text disappers on hover it will show a little box with the text */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg md:hidden">
              Home
            </div>
          </Link>
        </div>

        <SignedIn>
          <div className="space-y-3 mt-3">
            <Link
              to={"/chat"}
              className="flex items-center justify-start p-3 rounded-lg text-white hover:text-green-500 hover:bg-zinc-800/50 transition-all duration-200 group relative"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="ml-3 font-bold hidden md:inline">Chats</span>
              {/* basically if the "Chat" text disappers on hover it will show a little box with the alt image */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg md:hidden">
                Chat
              </div>
            </Link>
          </div>
        </SignedIn>
      </div>

      {/* The Songs below */}
      <div className="rounded-lg bg-zinc-900 p-4 flex-1">
        
          <div className="flex items-center justify-between mb-4 rounded-lg">
            <div className="flex items-center justify-start p-3 rounded-lg text-white">
              <Library className="size-5 mr-2 " />
              <span className="font-bold hidden md:inline">Your Library</span>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)] overflow-y-auto">
            <div className="space-y-3">
              {isLoading && albums.length === 0 ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer"
                  >
                    <img
                      src={album.imageUrl}
                      alt="playlist name"
                      className="size-14 -ml-2 rounded-md flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 ml-5 min-w-0 hidden md:block">
                      <p className="text-white font-semibold">{album.title}</p>
                      <p className="text-gray-400 text-sm">{album.artist}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        
      </div>
    </div>
  );
};

export default LeftSidebar;
