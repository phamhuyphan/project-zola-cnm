import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import SideBar from "../Components/SideBar";
import ChatZone from "../Components/ChatZone";
import SideBarClosed from "../Components/SideBarClosed";
import { ChatState } from "../providers/ChatProvider";

function ChatPage() {
  const { closeSideBar } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat } = ChatState();

  return (
    <Container
      maxW={"100vw"}
      h={"100vh"}
      display="flex"
      flexDir="row"
      p={0}
      className="transition-all "
    >
      <Box
        display={{
          base: !selectedChat ? "flex" : "none",
          md: closeSideBar ? "none" : "flex",
        }}
        flex={{ base: "1", md: "0.3" }}
      >
        <SideBar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
      <Box
        w={"fit-content"}
        display={{ base: "none", md: closeSideBar ? "flex" : "none" }}
        flex={{ base: "1", md: "0" }}
      >
        <SideBarClosed />
      </Box>

      <Box
        display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
        flex={{ base: closeSideBar ? "1" : "auto", md: "1" }}
      >
        <ChatZone fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Container>
  );
}

export default ChatPage;
