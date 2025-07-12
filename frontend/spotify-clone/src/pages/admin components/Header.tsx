import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/75 backdrop-blur-sm rounded-lg border border-zinc-800">
      <div className="flex items-center gap-5">
        <Link to="/" className="text-white text-lg font-semibold">
          <img src={"/spotify.png"} alt="playlist name" className="size-8 hover:scale-105 transition-transform duration-200" />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-white text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your music library</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;
