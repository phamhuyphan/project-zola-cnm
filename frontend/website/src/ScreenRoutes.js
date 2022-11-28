import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoadingPage from "./Components/loading/LoadingPage";
import CallPage from "./pages/CallPage";
import ForgotPage from "./pages/ForgotPassword";
const ChatPage = lazy(() => import("./pages/ChatPage"));
const WelcomePage = lazy(() => import("./pages/WelcomePage"));

function ScreenRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<LoadingPage />}>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/chats" element={<ChatPage />} />
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/call/:id/:user" element={<CallPage />} />
          <Route exact path="/reset-password/:id" element={<ForgotPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default ScreenRoutes;
