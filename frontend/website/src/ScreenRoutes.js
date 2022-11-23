import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoadingPage from "./Components/loading/LoadingPage";
<<<<<<< HEAD
import ForgotPage from "./pages/ForgotPage";
=======
import CallPage from "./pages/CallPage";
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
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
<<<<<<< HEAD
          <Route exact path="/reset-password/:id" element={<ForgotPage/>} />
=======
          <Route exact path="/call/:id/:user" element={<CallPage />} />
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default ScreenRoutes;
