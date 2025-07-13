import { UserButton } from "@clerk/clerk-react";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/75 backdrop-blur-sm rounded-lg border border-zinc-800">
      <div className="flex items-center gap-5 flex-1">
        <div className="group border border-zinc-700 rounded-full p-2 transition-all duration-200  hover:bg-zinc-800/70 cursor-pointer hover:scale-103 hover:shadow-lg ">
          <Link to="/" className="text-white text-lg font-semibold">
            <House className="size-8  group-hover:text-green-500 transition-colors duration-200 " />
          </Link>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-white text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage this library of unreleased music
          </p>
        </div>
      </div>

      <UserButton />
    </div>
  );
};

export default Header;
