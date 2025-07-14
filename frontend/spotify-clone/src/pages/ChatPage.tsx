import Topbar from "@/components/ui/ui/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { use, useEffect } from "react";
import UsersList from "./chat components/UsersList";
import ChatPlaceholder from "./chat components/ChatPlaceholder";
import ChatHeader from "./chat components/ChatHeader";
import useChatPage from "@/hooks/useChatPage";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatWindow from "./chat components/ChatWindow";
import MessageInput from "./chat components/MessageInput";

const ChatPage = () => {
  const { selectedUser, setSelectedUser } = useChatPage();

  //Clean up function to reset selected user when component unmounts
  useEffect(() => {
    return () => {
      setSelectedUser(null);
    };
  }, []);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

        {/* Chat messages section */}
        {selectedUser ? (
          <div className="h-full flex flex-col min-h-0">
            <ChatHeader />
            <div className="flex-1 flex flex-col min-h-0">
              <ChatWindow />
            </div>
            <MessageInput />
          </div>
        ) : (
          <ChatPlaceholder />
        )}
      </div>
    </main>
  );
};

export default ChatPage;
