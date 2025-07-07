import type { Album } from "@/types/album";
import type { Song } from "@/types/song";

export interface MusicStore {
    albums: Album[];
    songs: Song[];
    isLoading: boolean;
    error: string | null;
    fetchAlbums: () => Promise<void>;
}

