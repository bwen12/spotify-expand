import type { Users } from "@/types/users";
import type { Message } from "./message";

export interface ChatStore {
    users: Users[]; // Array of user objects
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    error : string | null;
    socket : any;
    isConnected: boolean;
    onlineUsers: Set<string>; // Set of online user IDs
    userActivities: Map<string, string>; // Map of user IDs to their activities
    messages: Message[]; // Array of messages
    selectedUser: Users | null; // Currently selected user for chat
    initSocket: (userId: string) => void; // Initialize socket connection with user ID
    disconnectSocket: () => void; // Disconnect the socket become offline
    sendMessage: (receiverId: string, senderId:string, content: string) => void; // Send a message to a specific user
    fetchMessages: (userId: string) => Promise<void>; // Fetch messages for a specific user
    setSelectedUser: (user: Users | null) => void; // Set the currently selected user for chat
}

