import type { Album } from "@/types/album";
import type { Song } from "@/types/song";

export interface MusicStore {
    albums: Album[];
    songs: Song[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
}

