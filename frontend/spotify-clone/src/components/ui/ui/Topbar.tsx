import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import SignInOauthButtons from "../SignInOauthButtons";
import { Button } from "../button";


const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      
      <div className="flex gaps-2 items-center">
        <Link to={"/"} className="flex items-center justify-start p-2 rounded-full hover:bg-zinc-800/70 transition-all duration-200 group relative">
          <img src={'/spotify.png'} alt="playlist name" className="size-7" />
        </Link>
        
      </div>
      
      <div className="flex gaps-2 items-center">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="h-6 w-6 text-white" />
            Admin DashBoard
          </Link>
        )}
        
        <SignedOut>
          <div className="hover:scale-[1.02] hover:opacity-80 transition-all duration-200 ease-out">
            <SignInOauthButtons />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="hover:scale-[1.02] hover:opacity-80 transition-all duration-200 ease-out">
            <SignOutButton>
              <Button variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Topbar;
