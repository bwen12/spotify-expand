import { useEffect, useState } from "react";
import Topbar from "../components/ui/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedSection from "@/components/ui/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "@/components/ui/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
const HomePage = () => {
  const {
    featuredSongs,
    trendingSongs,
    madeForYouSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
    isLoading,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);
  
  //TODO : Manage active instance so play button doesnt appear on every song
  const [activeInstanceId, setActiveInstanceId] = useState<string | null>(null)
  const { initializeQueue} = usePlayerStore();
  
  return (
    <div className="rounded-md h-full overflow-hidden  text-white bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid title = "Made for you" songs={madeForYouSongs} isLoading={isLoading}></SectionGrid>
            <SectionGrid title = "Trending" songs={trendingSongs} isLoading={isLoading}></SectionGrid>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
