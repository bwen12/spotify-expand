import { useParams } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorThief from "colorthief";
import { Button } from "@/components/ui/button";
import { AudioLines, Clock, Pause, Play } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//format the durateion to a readable format
export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const [bgColor, setBgColor] = useState("#5038a0");
  const { currentSong, isPlaying, playAlbum, togglePlayPause } =
    usePlayerStore();

  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [albumId, fetchAlbumById]);

  useEffect(() => {
    if (currentAlbum?.imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const colorThief = new (ColorThief as any)();
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      };
      img.src = currentAlbum.imageUrl;
    }
  }, [currentAlbum?.imageUrl]);

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) {
      togglePlayPause();
    } else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    const clickedSong = currentAlbum.songs[index];
    const isThisSongPlaying = currentSong?._id === clickedSong._id;

    if (isThisSongPlaying) {
      togglePlayPause(); // Only toggle if clicking the currently playing song
    } else {
      playAlbum(currentAlbum?.songs, index); // Always play the clicked song if it's different
    }
  };

  if (isLoading) return null;

  return (
    <div className="h-screen">
      <ScrollArea className="h-full">
        <div className="relative min-h-screen">
          {/* gradient here */}
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${bgColor}, #18181b)`,
            }}
            aria-hidden="true"
          />
          {/* Showing the album image then the title, song, year and etc next to the image */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt="Album Cover"
                className="w-[240px] h-[240px] rounded-lg shadow-lg"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4 text-white">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">
                    {currentAlbum?.artist}
                  </span>
                  <span className="text-gray font-sm">
                    • {currentAlbum?.releaseYear}
                  </span>
                  <span className="text-gray font-sm">
                    {currentAlbum?.songs.length} songs
                  </span>
                </div>
              </div>
            </div>

            {/* Controls play button below all that */}
            <div className="flex items-center ml-5 gap-6 mb-5 ">
              <Button
                //play the album from the start
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="h-6 w-6 text-black" />
                ) : (
                  <Play className="h-6 w-6 text-black" />
                )}
              </Button>
            </div>

            {/* Table Section with all the songs below the play button */}
            <div className="flex-1">
              <Table className="h-full w-full bg-black/20 backdrop-blur-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] pl-8">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Released Date</TableHead>
                    <TableHead className="text-right pr-8 w-[50px]">
                      <Clock className="h-4 w-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <TableRow
                        key={song._id}
                        className="group"
                        onClick={() => handlePlaySong(index)}
                      >
                        <TableCell className="font-medium pl-8">
                          <div className="flex items-center gap-1">
                            {isCurrentSong && isPlaying ? (
                              <AudioLines className="h-4 w-4 text-green-500" />
                            ) : (
                              <>
                                <span className="group-hover:hidden">
                                  {index + 1}
                                </span>
                                <Play className="h-4 w-4 text-green-500 hidden group-hover:block" />
                              </>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="flex items-center">
                          <img
                            src={song.imageUrl}
                            alt="song cover"
                            className="size-10"
                          />
                          <div className="flex flex-col ml-2">
                            <span className="text-white font-medium">
                              {song.title}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {song.artist}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="flex-col font-medium">
                          {song.createdAt.split("T")[0]}{" "}
                        </TableCell>

                        <TableCell className="text-right pr-8">
                          {formatDuration(song.duration)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
