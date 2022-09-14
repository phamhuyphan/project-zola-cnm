import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./providers/ChatProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <ChatProvider>
          <Routes>
            <Route exact path="/chats" element={<ChatPage />} />
            <Route exact path="/" element={<WelcomePage />} />
          </Routes>
        </ChatProvider>
      </Router>
    </div>
  );
}

export default App;
