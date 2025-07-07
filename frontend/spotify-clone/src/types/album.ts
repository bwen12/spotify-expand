import type { Song } from "./song";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: Date;
  songs: Song []; // Array of song IDs
}


