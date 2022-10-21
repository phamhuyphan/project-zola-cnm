import { AnimatePresence } from "framer-motion";
import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import WelcomePage from "./pages/WelcomePage";

function ScreenRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/chats" element={<ChatPage />} />
        <Route exact path="/" element={<WelcomePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default ScreenRoutes;
