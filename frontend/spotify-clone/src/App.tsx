import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
function App() {
  return (
    <>
      <header>
      
      <SignedOut>
        <SignInButton>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  );
}

export default App;
