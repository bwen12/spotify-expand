import { Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.ts";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const hasRun = useRef(false);
  
  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user || hasRun.current) return;
        hasRun.current = true; // Prevent multiple calls
        
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        
      } catch (error) {
        console.error("Error syncing user:", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <Card className="w-[90%] max-w-md bg-black/90 border-zinc-700/50 backdrop-blur-xl shadow-2xl shadow-green-500/10 rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center justify-center pb-4 pt-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
            <Loader className="h-8 w-8 animate-spin text-white" />
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">
            Welcome to Spotify Expand
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pb-8 px-8">
          <div className="text-center space-y-2">
            <h3 className="text-white text-lg font-semibold">
              Getting you signed in
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Just a moment while we set up your account...
            </p>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
