import Topbar from "@/components/ui/ui/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { use, useEffect } from "react";
import UsersList from "./chat components/UsersList";

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchMessages, setSelectedUser, fetchUsers } =
    useChatStore();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  //only fetch messages if a user is selected in the chat page
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.clerkId);
    }
  }, [selectedUser, fetchMessages]);
  
  return (
    <main className ="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar/>
      <div className = "grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList/>

      </div>
    </main>
  );
};

export default ChatPage;
