import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/chats" element={<ChatPage />} />
          <Route exact path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
