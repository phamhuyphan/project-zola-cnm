import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [notification, setNotification] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    //fecth local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) navigator("/");
  }, [navigator]);
  console.log("ChatProvied is called");
  return (
    <ChatContext.Provider
      value={{
        notification,
        setNotification,
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
