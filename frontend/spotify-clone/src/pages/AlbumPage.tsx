import { useParams } from "react-router-dom";
import Topbar from "../components/ui/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const AlbumPage = () => {
  const {albumId} = useParams();
  const {fetchAlbumById, currentAlbum, isLoading} = useMusicStore();
  
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-white">Album Page</h1>
        <p className="text-gray-400 mt-2">This is the album page.</p>
      </div>
    </div>
  );
};

export default AlbumPage;
