import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.tsx";
import ChatPage from "./pages/ChatPage.tsx";

function App() {
  return (
    <>
      <header>
        <Routes>
          // So if we have a main layout we can use it for all the pages
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>

          <Route
            path="/sso-callback"
            element={
              <AuthenticateWithRedirectCallback
                signUpForceRedirectUrl={"/auth-callback"}
              />
            }
          />
          <Route path="/auth-callback" element={<AuthCallbackPage />} />
        </Routes>
      </header>
    </>
  );
}

export default App;
