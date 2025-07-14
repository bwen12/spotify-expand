import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import LoaderScreen from "@/components/ui/loaderScreen";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket, fetchUsers } = useChatStore();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          // if user is authenitcated with token, check if the user is admin
          await checkAdminStatus();
          
          // Initialize the chat socket connection with userId
          // This will only be called if the user is authenticated with token
          if(userId) {
            await initSocket(userId);
            await fetchUsers();
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.error("Error fetching auth token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();

    //clean up 
    return () => {
      disconnectSocket();
    };
  }, [getToken, checkAdminStatus, userId, initSocket, disconnectSocket]);

  if (loading) {
    return <LoaderScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
