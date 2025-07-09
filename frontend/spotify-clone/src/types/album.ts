import type { Song } from "./song";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song []; // Array of song IDs
}


