import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button";

const SignInOauthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    //In the /sso-callback page google provide credentials with tokens for the user so they're autheniticated
    //we then take the users to the /auth-callback page where we can handle the authentication
    //and add the user to our database
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: `/auth-callback`,
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      Continue With Google
    </Button>
  );
};

export default SignInOauthButtons;
