import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library} from "lucide-react";
import AddAlbumModal from "./AddAlbumModal";
import AlbumsTable from "./AlbumsTable";

const AlbumTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-5 text-violet-500 " />
              Album Library
            </CardTitle>
            <CardDescription className="text-zinc-400 ">
              Add your favourite un-released album or your own custom album
            </CardDescription>
          </div>
          <AddAlbumModal />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};

export default AlbumTabContent;
