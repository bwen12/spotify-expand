import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import PlaybackControls from "./components/PlaybackControls";
import { useEffect, useState } from "react";
import { useAudio } from "@/hooks/useAudio";

//So basically on our spotify page the side bars will be the same with the music and friends onl;y the middle will change
//This is the main layout that will be used for all the pages
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const audio = useAudio();

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* This is not visisble just an audio element so that we can hear music*/}
        <audio
          ref={audio.audioRef}
          preload="metadata"
          className="hidden"
        />

        {/* Left side bar for songs */}
        <ResizablePanel defaultSize={8} minSize={!isMobile ? 15 : 0} maxSize={22} collapsedSize={0}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Content page that can be swapped */}
        <ResizablePanel defaultSize={isMobile ? 0 : 20} >
          <Outlet />
        </ResizablePanel>

        
        {/* Right side bar for friends */}
        {!isMobile && (
          <>
            <ResizableHandle />

            <ResizablePanel defaultSize={8} minSize={0} maxSize={20} collapsedSize={0}>
              <RightSidebar />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Footer or bottom bar for playback controls */}
      <PlaybackControls {...audio} />
    </div>
  );
};

export default MainLayout;
