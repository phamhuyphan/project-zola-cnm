import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import SideBar from "../Components/SideBar";
import ChatZone from "../Components/ChatZone";
import SideBarClosed from "../Components/SideBarClosed";
import { ChatState } from "../providers/ChatProvider";

function ChatPage() {
  const { closeSideBar, setCloseSideBar } = ChatState();
  useEffect(() => {}, [closeSideBar]);

  return (
    <Container
      maxW={"100vw"}
      h={"100vh"}
      display="flex"
      flexDir="row"
      p={0}
      className="transition-all "
    >
      {!closeSideBar ? (
        <Box flex={{ lg: 0.33333, base: 1 }}>
          <SideBar />
        </Box>
      ) : (
        <Box flex={{ lg: 0, base: 1 }}>
          <SideBarClosed />
        </Box>
      )}

      <Box flex={1} display={{ lg: "initial", base: 0 }}>
        <ChatZone />
      </Box>
    </Container>
  );
}

export default ChatPage;
