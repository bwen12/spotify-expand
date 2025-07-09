import { useParams } from "react-router-dom";
import Topbar from "../components/ui/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";


const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [albumId, fetchAlbumById]);

  if (isLoading) return null;

  return (
    <div>
      <Topbar />
      {/* Main content for the album page */}
      <div className="h-screen">
        <ScrollArea className="h-full">
          <div className="relative min-h-full">
            {/* gradient here */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 rounded-lg via-zinc-900/80 to-zinc-900 pointer-events-none"
              aria-hidden="true"
            />
            {/* Showing the actual album and text and etc */}
            <div className="relative z-10">
              <div className="flex p-6 g-6 pb-8">
                <img
                  src={currentAlbum?.imageUrl}
                  alt="Album Cover"
                  className="w-[240px] h-[240px] rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AlbumPage;
