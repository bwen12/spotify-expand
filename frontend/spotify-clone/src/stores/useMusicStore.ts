import { create } from 'zustand';
import { axiosInstance} from "@/lib/axios";
import type { MusicStore } from "@/types/musicStore";


export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    error: null,
    isLoading: false,
    currentAlbum: null,

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/albums');
            //store the fetched data into the albums variable which can be used
            //everywhere as it's a global state with Zustand so can use it in any component
            set({ albums: response.data});
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));