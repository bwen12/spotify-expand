import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import SignInOauthButtons from "../SignInOauthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "../button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gaps-2 items-center">
        <Link
          to={"/"}
          className="flex items-center justify-start p-2 rounded-full hover:bg-zinc-800/70 transition-all duration-200 group relative"
        >
          <img src={"/spotify.png"} alt="playlist name" className="size-7" />
        </Link>
      </div>

      <div className="flex gap-3 items-center ">
        <SignedIn>
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2 p-2 rounded-full hover:bg-zinc-800/70 transition-all duration-200"
            )}
          >
            <LayoutDashboardIcon className="h-6 w-6 text-white mr-1.5" />
            {isAdmin ? <span>Admin Dashboard</span> : <span>Upload</span>}
          </Link>
        </SignedIn>

        <SignedOut>
          <div className="hover:scale-[1.02] hover:opacity-80 transition-all duration-200 ease-out">
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
