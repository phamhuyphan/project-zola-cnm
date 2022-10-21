const { createContext, useContext, useState } = require("react");

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [responseMessage, setResponseMessage] = useState(null);
  console.log("MessagesProvider is called");
  return (
    <MessagesContext.Provider value={{ responseMessage, setResponseMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const MessageState = () => {
  return useContext(MessagesContext);
};
export default MessagesProvider;
