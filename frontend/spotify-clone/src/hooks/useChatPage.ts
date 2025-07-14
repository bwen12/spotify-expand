import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";

export const useChatPage = () => {
  const { user } = useUser();
  const { selectedUser, fetchMessages, setSelectedUser, fetchUsers, onlineUsers } =
    useChatStore();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.clerkId);
    }
  }, [selectedUser, fetchMessages]);

  

  return {
    selectedUser,
    setSelectedUser,
    onlineUsers
  };
};

export default useChatPage;
