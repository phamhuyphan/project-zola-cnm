import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const [closeSideBar, setCloseSideBar] = useState(false);

  const navigator = useNavigate();
  useEffect(() => {
    //fecth local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigator("/");
    }
  }, [navigator]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        closeSideBar,
        setCloseSideBar,
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
