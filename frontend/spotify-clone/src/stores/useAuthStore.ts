import { create } from 'zustand';
import { axiosInstance} from "@/lib/axios";
import type { AuthStore } from "@/types/authStore";

export const useAuthStore = create<AuthStore>(( set ) => ({
    isAdmin: false,
    error: null,
    isLoading: false,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/admin/check');
            set({ isAdmin: response.data.admin });
        } catch (error:any) {
            set({isAdmin:false, error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    resetAuthState: () => set({ isAdmin: false, error: null, isLoading: false })


}));
