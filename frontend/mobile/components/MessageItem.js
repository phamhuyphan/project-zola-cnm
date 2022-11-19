import axios from "axios";
import moment from "moment";
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  DeleteIcon,
  IconButton,
  Image,
  SunIcon,
  Text,
  Tooltip,
  useColorMode,
} from "native-base";
import React, { useRef, useState } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUserMargin,
} from "../logic/ChatLogic";
import { ChatState } from "../providers/ChatProvider";

const link = "http://192.168.1.7:5000";
function MessageItem({ messages, setMessages, m, i }) {
  const { user, selectedChat, setResponse } = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const { colorMode } = useColorMode();
  const { file, setFile } = useState("");
  const fetchMessages = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: source.token,
      };
      const { data } = await axios.get(
        `${link}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setFile(data.multiFile);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else console.log(error);
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };
  async function handleDelete(messageId) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios
        .put(
          `${link}/api/message/delete`,
          {
            messageId: messageId,
          },
          config
        )
        .then((res) => {
          console.log(user);
          console.log(res.data);
        });
      fetchMessages();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Box
        id={m._id}
        key={m._id}
        marginBottom={1}
        display="flex"
        flexDirection={"row"}
        alignItems="center"
        position={"relative"}
        zIndex={0}
      >
        {(isSameSender(messages, m, i, user._id) ||
          isLastMessage(messages, i, user._id)) && (
          <Avatar
            size="sm"
            showBorder={true}
            my="auto"
            mx={3}
            justifyContent="center"
            alignItems={"center"}
            source={{ uri: m.sender.pic ? m.sender.pic : "no-links" }}
            marginTop={isSameUserMargin(messages, m, i, user._id) ? 0 : 45}
          />
        )}

        <Box
          maxWidth="75%"
          minW={"75px"}
          borderRadius="10px"
          backgroundColor={`${m.sender._id === user._id ? "#BEE3F8" : "white"}`}
          border="1px solid"
          borderColor={"transparent"}
          padding={m?.content ? 3 : 0}
          marginLeft={isSameSenderMargin(messages, m, i, user._id)}
          marginTop={isSameUserMargin(messages, m, i, user._id) ? "auto" : 15}
          position={"relative"}
        >
          <Text fontSize={"md"} whiteSpace="pre-wrap">
            {m.content}
          </Text>

          {(isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id)) && (
            <Text fontSize={9} marginLeft={0} textColor={"white"}>
              {moment(m.createdAt).calendar()}
            </Text>
          )}
          {/* <Box
            display={isHover && m.content !== "deleted" ? "flex" : "none"}
            position="absolute"
            w="100px"
            justifyContent={"space-between"}
            alignItems={"center"}
            top={0}
            bottom={0}
            m={"auto 0"}
            right={m.sender._id === user._id ? "unset" : -32}
            left={m.sender._id === user._id ? -32 : "unset"}
          >
            <IconButton
              borderRadius={"full"}
              onPress={() => {
                setResponse(m);
              }}
              icon={<SunIcon fontSize={15} />}
            ></IconButton>
            <IconButton
              display={m.sender._id === user._id ? "inline" : "none"}
              onClick={onOpen}
              borderRadius={"full"}
              icon={<DeleteIcon fontSize={15} />}
            ></IconButton>
          </Box> */}
          {/* <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
            Delete
          </Button> */}
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Delete Customer</AlertDialog.Header>
              <AlertDialog.Body>
                This will remove all data relating to Alex. This action cannot
                be reversed. Deleted data can not be recovered.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      onClose();
                      handleDelete(m._id);
                    }}
                  >
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Box>
      </Box>
    </>
  );
}

export default MessageItem;
