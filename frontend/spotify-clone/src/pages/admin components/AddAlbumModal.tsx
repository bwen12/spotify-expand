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
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
//These variable names are important as they match the backend expectations
const defaultAlbum = {
  title: "",
  artist: "",
  releaseYear: new Date().getFullYear(),
};
const defaultFile = {
  image: null,
};

const AddAlbumModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAlbum, setNewAlbum] = useState(defaultAlbum);
  const [file, setFile] = useState<{ image: File | null }>(defaultFile);
  const { fetchAlbums, fetchStats } = useMusicStore();

  const albumInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleReset = useCallback(() => {
    setNewAlbum(defaultAlbum);
    setFile(defaultFile);
  }, []);

  useEffect(() => {
    if (!modalOpen) handleReset();
  }, [modalOpen, handleReset]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!file.image || !newAlbum.title || !newAlbum.artist) {
        return toast.error("Please fill all fields and upload both files");
      }
      //this is how we can send files to the backend
      //the names have to match the backend expectations
      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", file.image);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewAlbum(defaultAlbum);
      fetchAlbums();
      fetchStats(); // Update stats after adding a new album
      toast.success("Added Successfully");
    } catch (error: any) {
      toast.error("Failed to add Album. Please try again.");
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 hover:scale-102 hover:shadow-md cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto not-[]:sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
          <DialogDescription>
            Add unreleased albums or your own custom album collection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            ref={albumInputRef}
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
          onClick={() => albumInputRef.current?.click()}
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

        {/*Other Inputs*/}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Title</label>
          <Input
            value={newAlbum.title}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, title: e.target.value })
            }
            placeholder="Enter album title"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Artist</label>
          <Input
            value={newAlbum.artist}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, artist: e.target.value })
            }
            placeholder="Enter album artist"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Release Year</label>
          <Input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={newAlbum.releaseYear}
            onChange={(e) =>
              setNewAlbum({
                ...newAlbum,
                releaseYear: parseInt(e.target.value),
              })
            }
            placeholder="Enter album release year"
            className="bg-zinc-800 text-white placeholder:text-zinc-500"
          />
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
              disabled={isLoading || !file.image || !newAlbum.title || !newAlbum.artist}
            >
              {isLoading ? "Adding..." : "Add Song"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumModal;
