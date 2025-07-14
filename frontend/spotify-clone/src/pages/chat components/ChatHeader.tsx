import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={selectedUser?.imageUrl}
            alt={selectedUser?.fullName}
          />
          <AvatarFallback>{selectedUser?.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="font-medium">
          <h2 className="font-medium">{selectedUser?.fullName}</h2>

          <p className="text-sm text-zinc-400">
            {selectedUser?.clerkId && onlineUsers.has(selectedUser?.clerkId)
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
