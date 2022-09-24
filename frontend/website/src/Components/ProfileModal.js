import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children && (
        <span onClick={onOpen} style={{ cursor: "pointer" }}>
          {children}
        </span>
      )}
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="white"
            fontSize="40px"
            display="flex"
            justifyContent="center"
            pos={"relative"}
          >
            <Box
              bg={"black"}
              w="full"
              top="-10"
              h="150px"
              pos="absolute"
              zIndex={0}
            ></Box>
            <Avatar
              size="2xl"
              name={user.fullname}
              pos="relative"
              zIndex={10}
              src={user.pic}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
            justifyContent="space-around"
          >
            <div>
              <Text>User Name: @{user.username}</Text>
              <Text>Name: {user.fullname}</Text>
              <Text>Email: {user.email}</Text>
            </div>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
