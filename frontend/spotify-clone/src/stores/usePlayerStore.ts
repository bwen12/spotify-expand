import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import type { PlayerStore } from "@/types/playerStore";
import type { Song } from "@/types/song";

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
      isPlaying: true,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    set({
      queue: songs,
      currentIndex: startIndex,
      currentSong: songs[startIndex],
      isPlaying: true,
    });
  },

  setCurrentSong: (song) => {
    if (!song) return;
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      isPlaying: true,
    });
  },

  togglePlayPause: () => {
    const willStartPlaying = !get().isPlaying;
    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    //if there is a next song to play, we will play it
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      //no next song
      set({ isPlaying: false });
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    //if there is a previous song to play, we will play it
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      //no previous song
      set({ isPlaying: false });
    }
  },
}));
