import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";


const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();
  const { isAdmin } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400"> Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400"> {error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <Table className="h-full w-full bg-black/20 backdrop-blur-sm">
        <TableHeader className="px-10">
          <TableRow>
            <TableHead className="w-[40%] text-zinc-400 pl-6">Title</TableHead>
            <TableHead className="w-[30%] text-zinc-400 ">Artist</TableHead>
            <TableHead className="w-[30%] text-zinc-400">
              Released Date
            </TableHead>
            {isAdmin && (
              <TableHead className="text-right text-zinc-400 pr-6">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id} className="group">
              <TableCell className="flex items-center gap-2">
                <img
                  src={song.imageUrl}
                  alt="song cover"
                  className="size-20 rounded object-cover"
                />
                <span className="text-white font-medium">{song.title}</span>
              </TableCell>
              <TableCell className="font-medium items-center">
                {song.artist}
              </TableCell>

              <TableCell className="text-white">
                <span className=" inline-flex items-center gap-2 text-white">
                  <Calendar className="h-4 w-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>
              {isAdmin && (
                <TableCell className="text-zinc-400 pr-6">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer"
                      onClick={() => deleteSong(song._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongsTable;
