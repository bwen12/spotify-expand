import Topbar from "@/components/ui/ui/Topbar";
import { useEffect } from "react";
import UsersList from "./chat components/UsersList";
import ChatPlaceholder from "./chat components/ChatPlaceholder";
import ChatHeader from "./chat components/ChatHeader";
import useChatPage from "@/hooks/useChatPage";
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
        <div className="border-r border-zinc-500 pt-4">
          <UsersList />
        </div>

        {/* Chat messages section */}
        <div className="h-full flex flex-col min-h-0 pt-4">
          {selectedUser ? (
            <div className="h-full flex flex-col min-h-0 pt-4">
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
      </div>
    </main>
  );
};

export default ChatPage;
