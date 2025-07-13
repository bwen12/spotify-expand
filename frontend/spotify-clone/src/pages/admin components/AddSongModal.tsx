import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/stores/useMusicStore";
import { FileAudio, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";

const defaultSong = {
  title: "",
  artist: "",
  album: "",
  duration: "",
};
const defaultFile = {
  audio: null,
  image: null,
};

const AddSongModal = () => {
  //to use in the drop down as we need to select all albums
  const {albums, fetchSongs, fetchStats } = useMusicStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSong, setNewSong] = useState(defaultSong);
  const [file, setFile] = useState<{ audio: File | null; image: File | null }>(
    defaultFile
  );

  //References
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // TODO: refactor to useMusic store but maybe is fine since it's not reused
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!file.audio || !file.image || !newSong.title || !newSong.artist || !newSong.duration) {
        return toast.error("Please fill all fields and upload both files");
      }
      //this is how we can send files to the backend
      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);
      //we have a value with none for single songs not associated with any album
      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }
      //We name this speciically cause in our backend it take audioFile, and imageFile 
      //so exact name should be used
      formData.append("audioFile", file.audio);
      formData.append("imageFile", file.image);
      await axiosInstance .post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setNewSong(defaultSong);
      setFile(defaultFile);
      fetchSongs(); 
      fetchStats(); // Update stats after adding a new song
      toast.success("Added Successfully");
    } catch (error: any) {
        toast.error("Failed to add song. Please try again.");
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  const handleReset = useCallback(() => {
    setNewSong(defaultSong);
    setFile(defaultFile);
  }, []);

  useEffect(() => {
    if (!modalOpen) handleReset();
  }, [modalOpen, handleReset]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer transition-all duration-200 hover:scale-102 hover:shadow-md"
          onClick={() => setModalOpen(true)}
        >
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto not-[]:sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add to the collection of unreleased songs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFile((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e) =>
              setFile((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />
        </div>

        {/*Image upload area it redirect to the imageInputRef input above */}
        {/*so we can have our own custom styling if user has uploaded an image*/}
        {/*show the image name other wise tell them to choose file*/}
        <div
          className="flex items-center justify-center p-4 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
          onClick={() => imageInputRef.current?.click()}
        >
          <div className="text-center ">
            {file.image ? (
              <div className="space-y-2">
                <div className="text-sm text-emerald-500"> Image Selected</div>
                <div className="text-sm text-zinc-400">
                  {file.image.name.slice(0, 20)}
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                  <Upload className="h-6 w-6 text-zinc-400" />
                </div>
                <div className="text-sm text-zinc-400"> Cover Image</div>
                <Button
                  variant="ghost"
                  className="text-zinc-400 text-xs hover:text-zinc-300"
                >
                  Choose Files
                </Button>
              </>
            )}
          </div>
        </div>

        {/*Audio upload area it redirect to the audioInputRef input above */}
        <div
          className="flex items-center justify-center p-3 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
          onClick={() => audioInputRef.current?.click()}
        >
          <div className="flex flex-col items-center w-full">
            {file.audio ? (
              <div className="space-y-2">
                <div className="text-sm text-emerald-500"> Audio Selected</div>
                <div className="text-sm text-zinc-400">
                  {file.audio.name.slice(0, 20)}
                </div>
              </div>
            ) : (
              <>
                <div className=" bg-zinc-800 rounded-full p-2">
                  <FileAudio className="h-5 w-5 text-zinc-400" />
                </div>

                <Button
                  variant="ghost"
                  className="text-zinc-400 text-xs hover:text-zinc-300"
                >
                  Upload Audio
                </Button>
              </>
            )}
          </div>
        </div>
        {/*Other Inputs*/}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Title</label>
          <Input
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            placeholder="Enter song title"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Artist</label>
          <Input
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            placeholder="Enter song artist"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Duration (Seconds)</label>
          <Input
            type="number"
            min="0"
            value={newSong.duration}
            onChange={(e) =>
              setNewSong({ ...newSong, duration: e.target.value })
            }
            placeholder="Enter song duration"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2 flex flex-col ">
          <label className="text-sm text-zinc-400 font-medium">
            Album (Optional)
          </label>
          <Select
            value={newSong.album}
            onValueChange={(value) => setNewSong({ ...newSong, album: value })}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 gap-2 w-full">
              <SelectValue placeholder="Select album" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 w-full ">
              <SelectItem value="none">No Album (Single)</SelectItem>
              {albums.map((album) => (
                <SelectItem key={album._id} value={album._id}>
                  {album.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <div className="flex items-center justify-end gap-4">
            <Button
              variant="outline"
              className="text-zinc-400 hover:text-white"
              onClick={() => setModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleSubmit}
              disabled={isLoading || !file.audio || !file.image || !newSong.title || !newSong.artist || !newSong.duration}
            >
              {isLoading ? "Adding..." : "Add Song"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongModal;
