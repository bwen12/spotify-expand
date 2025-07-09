import { create } from 'zustand';
import { axiosInstance} from "@/lib/axios";
import type { ChatStore } from "@/types/chatStore";


export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
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
}));    