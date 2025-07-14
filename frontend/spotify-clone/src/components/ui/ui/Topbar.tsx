import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import SignInOauthButtons from "../SignInOauthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "../button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-950/75 backdrop-blur-md z-10">
      <div className="flex gaps-1 items-center">
        <Link
          to={"/"}
          className="flex items-center justify-start p-2 rounded-full hover:bg-zinc-800/70 transition-all duration-200 hover:scale-105 hover:shadow-lg group relative"
        >
          <img src={"/spotify3.png"} alt="playlist name" className="size-10" />
        </Link>
      </div>

      <div className="flex gap-3 items-center ">
        <SignedIn>
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2 p-2 rounded-full hover:bg-zinc-800/70 transition-all duration-200 hover:scale-102 hover:shadow-md"
            )}
          >
            <LayoutDashboardIcon className="h-6 w-6 text-white mr-1.5" />
            {isAdmin ? <span>Admin Dashboard</span> : <span>Contribute Songs</span>}
          </Link>
        </SignedIn>

        <SignedOut>
          <div className="hover:scale-[1.02] transition-all duration-200 ease-out">
            <SignInOauthButtons />
          </div>
        </SignedOut>

        {/* User can sign out using clerks UserButton */}
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
