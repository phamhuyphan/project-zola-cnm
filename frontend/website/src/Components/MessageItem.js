import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUserMargin,
} from "../logic/ChatLogic";
import { ChatState } from "../providers/ChatProvider";

function MessageItem({ messages, m, i }) {
  const [isHover, setIsHover] = useState(false);
  const { user, setResponse } = ChatState();
  return (
    <>
      <Box
        key={m._id}
        marginBottom={1}
        display="flex"
        textColor={"blackAlpha.900"}
        alignItems="center"
        position={"relative"}
        zIndex={0}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/** messages, m, i, _id */}
        {(isSameSender(messages, m, i, user._id) ||
          isLastMessage(messages, i, user._id)) && (
          <Tooltip
            label={"@" + m.sender.username}
            hasArrow
            placeContent="bottom-start"
          >
            <Avatar
              size="md"
              showBorder={true}
              cursor="pointer"
              my="auto"
              mr={2}
              display={m.sender._id === user._id && "none"}
              name={m.sender.username}
              src={m.sender.pic}
              marginTop={isSameUserMargin(messages, m, i, user._id) ? 0 : 45}
            />
          </Tooltip>
        )}

        <Box
          className="shadow-lg"
          display="flex"
          flexDirection="column"
          maxWidth="75%"
          w={"fit-content"}
          borderRadius="10px"
          backgroundColor={`${
            m.sender._id === user._id ? "#BEE3F8" : "whiteAlpha.900"
          }`}
          padding="10px"
          marginLeft={isSameSenderMargin(messages, m, i, user._id)}
          marginTop={isSameUserMargin(messages, m, i, user._id) ? "auto" : 30}
          position={"relative"}
        >
          {m?.response && (
            <Box pos="relative">
              <Text
                fontSize={"xs"}
                color="blackAlpha.800"
                pos="relative"
                top={0}
                left={0}
              >
                @{m?.response?.sender.username}
              </Text>
              <Box bg="blackAlpha.500" p={1} pt={4} rounded="sm" display="flex">
                <Text
                  color="whiteAlpha.800"
                  className="truncate"
                  maxW={"150px"}
                >
                  {m?.response?.content}
                </Text>
              </Box>
            </Box>
          )}

          <Text width={"fit-content"}>{m.content}</Text>
          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Text
              width={"fit-content"}
              fontSize={9}
              marginLeft={0}
              textColor={"blackAlpha.900"}
            >
              {moment(m.createdAt).calendar()}
            </Text>
          )}
          <IconButton
            display={isHover ? "" : "none"}
            position="absolute"
            top={0}
            bottom={0}
            m={"auto 0"}
            borderRadius={"full"}
            right={m.sender._id === user._id ? "unset" : -16}
            left={m.sender._id === user._id ? -16 : "unset"}
            icon={
              <DeleteIcon
                fontSize={15}
                onClick={() => {
                  setResponse(m);
                  console.log(m);
                }}
              />
            }
          ></IconButton>
        </Box>
      </Box>
    </>
  );
}

export default MessageItem;
