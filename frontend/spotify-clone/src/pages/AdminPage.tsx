import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./admin components/Header";
import DashBoard from "./admin components/DashBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AlbumPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  if (!isAdmin && !isLoading) {
    return <div className="h-screen">Unauthorised</div>;
  }

  return (
    <div className="h-screen">
      <Header />

      <DashBoard />

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default AlbumPage;
