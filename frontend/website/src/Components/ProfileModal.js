import {
  Avatar,
  Box,
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
              name={user?.fullname}
              pos="relative"
              zIndex={10}
              src={user?.pic}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
            justifyContent="space-around"
          >
            <Box display={"flex"} flexDir="column" alignItems="center">
              <Text>@{user?.username}</Text>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {user?.fullname}
              </Text>
              <Text>Email: {user?.email}</Text>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
