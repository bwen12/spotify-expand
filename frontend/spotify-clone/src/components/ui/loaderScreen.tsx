import { Loader } from "lucide-react";

const loaderScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <div className="flex flex-col items-center space-y-6">
        {/* Spotify-inspired logo/icon area */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25">
            <Loader className="animate-spin h-10 w-10 text-white" />
          </div>
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 w-20 h-20 bg-green-500/20 rounded-full animate-ping"></div>
        </div>

        {/* Modern text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Spotify Expand
          </h2>
          <p className="text-zinc-400 text-sm">Getting your music ready...</p>
        </div>

        {/* Modern progress bar */}
        <div className="w-64 bg-zinc-800 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default loaderScreen;
