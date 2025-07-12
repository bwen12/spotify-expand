import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./admin components/Header";
import DashBoard from "./admin components/DashBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./admin components/SongsTabContent";
import AlbumTabContent from "./admin components/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchStats, fetchSongs, fetchAlbums } = useMusicStore();

  useEffect(() => {
    //fetch albums()
    fetchAlbums();
    //fetch songs()
    fetchSongs();
    //fetch stats
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) {
    return <div className="h-screen">Unauthorised</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />

      <DashBoard />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-800 "
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-800 "
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>

        {/* Content of the song and albums tab */}
        <TabsContent value="songs">
          {/* Songs management content goes here */}
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          {/* Songs management content goes here */}
          <AlbumTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
