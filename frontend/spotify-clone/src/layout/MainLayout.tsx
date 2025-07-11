import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";

//So basically on our spotify page the side bars will be the same with the music and friends onl;y the middle will change
//This is the main layout that will be used for all the pages
const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflowhidden p-2">
        {/* This is not visisble just an audio element so that we can hear music*/}
        <AudioPlayer /> 
        
        {/* Left side bar for songs */}
        <ResizablePanel defaultSize={10} minSize={isMobile ? 0 : 20} maxSize={30} collapsedSize={0}>
           <LeftSidebar />
        </ResizablePanel>

         <ResizableHandle />
        
        {/* Main Content page that can be swapped */}
        <ResizablePanel defaultSize={isMobile ? 0 : 20} >
            <Outlet />
        </ResizablePanel>

        <ResizableHandle />
        
        {/* Right side bar for friends */}
        <ResizablePanel defaultSize={10} minSize={0} maxSize={30} collapsedSize={0}>
            <RightSidebar/>
        </ResizablePanel>
      
      </ResizablePanelGroup>

      {/* Footer or bottom bar for playback controls */}
      <PlaybackControls />

      
    </div>
  );
};

export default MainLayout;
