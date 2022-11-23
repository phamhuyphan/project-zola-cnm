import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [notification, setNotification] = useState([]);
<<<<<<< HEAD
  const [forgotPass, setForgotPass] = useState(false);

=======
  const [response, setResponse] = useState(null);
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
  const navigator = useNavigate();
  useEffect(() => {
    //fecth local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const forgotInfo = JSON.parse(localStorage.getItem("forgotInfo"));
    setUser(userInfo);
    setForgotPass(forgotInfo);
    if(forgotPass && !userInfo) navigator("/reset-password/:userId");
    else
    if (!userInfo) navigator("/");
  }, [navigator]);

  return (
    <ChatContext.Provider
      value={{
        notification,
        setNotification,
        selectedChat,
        setSelectedChat,
        chats,
        forgotPass, setForgotPass,
        setChats,
        closeSideBar,
        setCloseSideBar,
        user,
        setUser,
        response,
        setResponse,
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
