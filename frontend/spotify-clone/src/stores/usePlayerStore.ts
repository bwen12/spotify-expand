import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import type { PlayerStore } from "@/types/playerStore";
import type { Song } from "@/types/song";
import { useChatStore } from "./useChatStore";

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  volume: 50,

  setVolume: (value: number) => {
    set({ volume: value });
  },

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playHomepageSong: (song) => {
    if (!song) return;
    set({
      currentSong: song,
      queue: [song], // Single song queue
      currentIndex: 0,
      isPlaying: true,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }
    set({
      queue: songs,
      currentIndex: startIndex,
      currentSong: song,
      isPlaying: true,
    });
  },

  setCurrentSong: (song) => {
    if (!song) return;
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      isPlaying: true,
    });
  },

  togglePlayPause: () => {
    const willStartPlaying = !get().isPlaying;
    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong?.title} by ${currentSong?.artist}`
            : "Idle",
      });
    }
    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 1) {
      const currentSong = get().currentSong;
      if (currentSong) {
        // Force a state update to trigger AudioPlayer restart
        set({
          currentSong: { ...currentSong }, // Create new reference to trigger useEffect
          currentIndex: 0,
          isPlaying: true,
        });
      }
      return;
    }
    const nextIndex = currentIndex + 1;
    //if there is a next song to play, we will play it
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      //no next song
      set({ isPlaying: false });
      
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },

  playPrevious: () => {
    const { queue, currentIndex } = get();
    // If queue has only 1 song (homepage), restart the same song
    if (queue.length === 1) {
      const currentSong = get().currentSong;
      if (currentSong) {
        // Force a state update to trigger AudioPlayer restart
        set({
          currentSong: { ...currentSong }, // Create new reference to trigger useEffect
          currentIndex: 0,
          isPlaying: true,
        });
      }
      return;
    }
    const prevIndex = currentIndex - 1;
    //if there is a previous song to play, we will play it
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
        });
      }

      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      //no previous song
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
}));
