import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import LoaderScreen from "@/components/ui/loaderScreen";
import { useAuthStore } from "../stores/useAuthStore";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          // if user is authenitcated with token check if the user is admin
          await checkAdminStatus();
        }
      } catch (error) {
        updateApiToken(null);
        console.error("Error fetching auth token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [getToken]);

  if (loading) {
    return <LoaderScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
