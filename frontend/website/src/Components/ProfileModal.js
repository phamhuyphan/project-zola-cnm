import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
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
          <ModalHeader fontSize="40px" display="flex" justifyContent="center">
            User Infomation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="row" justifyContent="space-around">
            <Avatar size="2xl" name={user.fullname} src={user.pic} />
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
