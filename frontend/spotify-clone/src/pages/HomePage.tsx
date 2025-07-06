import Topbar from "../components/ui/ui/Topbar";
const HomePage = () => {
  return (
    <div>
      <Topbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Spotify Clone
        </h1>
        <p className="text-lg mb-8">This is a simple home page.</p>
      </div>
    </div>
  );
};

export default HomePage;
