import { create } from 'zustand';
import { axiosInstance} from "@/lib/axios";
import type { ChatStore } from "@/types/chatStore";
import { io } from "socket.io-client";
import type { Message } from '@/types/message';

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"

const socket = io(baseURL, {
  autoConnect: false, // only connect if user is authenitcated
  withCredentials: true, // to allow cookies to be sent with requests
});


export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: socket,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,
    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },
    
    fetchUsers: async () => {
        set({ users: [], isLoading: true, error: null  }); // Reset users before fetching
        try {
            const response = await axiosInstance.get('/users'); 
            set({ users: response.data });
        } catch (error:any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    initSocket: (userId) => {
        if (!get().isConnected){
            socket.auth = { userId }; // Pass userId as authentication data
            socket.connect();
            
            socket.emit("user_connected", userId);
            
            //Name is important this is meant to be users_online
            socket.on("users_online", (users:string[]) => {
                set({ onlineUsers: new Set(users) });
            });
            
            socket.on("activities", (activities: [string, string][]) => {
                set({userActivities: new Map(activities)})
            });

            socket.on("user_connected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId]),
                }));
            });

            socket.on("user_disconnected", (userId: string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                });
            }); 

            //Name is important backend is "recieve_message"
            socket.on("receive_message", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            socket.on("message_sent", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            socket.on("activity_updated", ({userId, activity}) => {
                set((state) => {
                    const newActivities = new Map(state.userActivities);
                    newActivities.set(userId, activity);
                    return { userActivities: newActivities };
                });
            });

            set({ isConnected: true });
        }
    },

    disconnectSocket: () => {
        if (get().isConnected) {
            socket.disconnect();
            set({ isConnected: false });
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket;
        if (!socket) return;

        socket.emit("send_message", { receiverId, senderId, content });
    },

    fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`);
            set({ messages: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },


}));    