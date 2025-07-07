export interface Song {
  _id: string;
  title: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}