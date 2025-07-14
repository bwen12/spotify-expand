import { useChatStore } from "@/stores/useChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersList = () => {
  const {
    users,
    isLoading,
    error,
    setSelectedUser,
    onlineUsers,
    selectedUser,
  } = useChatStore();
  return (
    <div className="border-r border-zinc-500">
      <div className=" flex flex-col h-full">
        <ScrollArea className="h-full">
          <div className="space-y-2 p-4">
            {isLoading && users.length === 0 ? (
              <UsersListSkeleton />
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:scale-103 hover:shadow-lg hover:bg-zinc-800 ${
                    selectedUser?.clerkId === user.clerkId
                      ? "bg-zinc-700 ring-2 ring-green-500"
                      : "hover:bg-zinc-800/50"
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="relative">
                    <Avatar className="size-6 md:size-12">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    {/* Show online status dot */}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-zinc-900 ${
                        onlineUsers.has(user.clerkId)
                          ? "bg-green-500"
                          : "bg-zinc-500"
                      }`}
                    />
                  </div>
                  <div className="flex items-center lg:block">
                    <span className="text-sm font-medium truncate text-white">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
