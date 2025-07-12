import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music, Plus } from "lucide-react";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500 " />
              Songs Library
            </CardTitle>
            <CardDescription className="text-zinc-400 ">
              See something missing? Add a new song
            </CardDescription>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white ">
            <Plus className="size-4 mr-1" />
            Add New Song
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
