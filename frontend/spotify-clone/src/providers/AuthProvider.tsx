import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({children} : {children:React.ReactNode}) => {
    const {getToken} = useAuth();
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            } catch (error) {
                updateApiToken(null);
                console.error("Error fetching auth token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [getToken]);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="animate-spin h-10 w-10 text-blue-500" />
            <span className="ml-2 text-gray-700">Loading...</span>  
        </div>
    );

    return <>{children}</>
  
}

export default AuthProvider;