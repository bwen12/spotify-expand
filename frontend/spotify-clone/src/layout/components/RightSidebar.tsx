import { Music, Users } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import LoginPrompt from "@/components/ui/loginPrompt";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RightSidebar = () => {
  const { users, fetchUsers, onlineUsers, userActivities } =
    useChatStore();
  const { user, isLoaded } = useUser();

  

  // Wait until user data is loaded
  if (!isLoaded) return null;

  // If user is not signed in, show login prompt
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm rounded-lg g-2">
      {/* Header - only show when signed in */}
      <div className="rounded-lg bg-zinc-900">
        <div className="p-4 flex items-center border-b border-zinc-800 group relative">
          <Users className="h-6 w-6" />
          <span className="ml-3 font-bold hidden md:inline">
            Friend Activity
          </span>
          <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg md:hidden">
            Friend Activity
          </div>
        </div>
      </div>

      {/* Users list */}
      <ScrollArea className="h-full flex-1">
        <div className="rounded-lg bg-zinc-900 h-full mt-2">
          <div className="space-y-4 p-4">
            {users.map((user) => {
              const activity = userActivities.get(user.clerkId);
              const isPlaying = activity && activity !== "Idle";
              return (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer group relative"
                >
                  <div className="relative size-10">
                  <Avatar className="size-10 border border-zinc-800 relative">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="rounded-full"
                    />
                    <AvatarFallback>N/A</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-zinc-900 ${
                      onlineUsers.has(user.clerkId)
                        ? "bg-green-500"
                        : "bg-zinc-500"
                    }`}
                  />
                  </div>
                  <div className="flex flex-col gap-0.5 -mt-1">
                    <span className="text-white font-semibold mt-3">
                      {user.fullName}
                    </span>
                    {isPlaying ? (
                      <div className="flex flex-col -mt-0.5">
                        <div className="text-xs text-zinc-400 font-medium ">
                          {activity.replace("Playing ", "").split("by")[0]}
                        </div>
                        <div className="text-xs text-zinc-400 ">
                          {isPlaying && (
                            <Music className="inline h-3 w-4 text-emerald-400 -ml-1" />
                          )}
                          <span className="ml-1">
                            {activity.split("by")[1]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-400 -mt-0.5">Idle</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSidebar;
