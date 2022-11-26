import React from "react";
import { HStack, Skeleton } from "native-base";

const ChatLoading = () => {
  return (
    <>
      <HStack m="2">
        <Skeleton m="2" rounded="full" h="10"></Skeleton>
        <Skeleton px="4" my="4" flex="1" startColor="gray.800" />
      </HStack>
      <HStack m="2">
        <Skeleton m="2" rounded="full" h="10"></Skeleton>
        <Skeleton px="4" my="4" flex="1" startColor="gray.400" />
      </HStack>

      <HStack m="2">
        <Skeleton m="2" rounded="full" h="10"></Skeleton>
        <Skeleton px="4" my="4" flex="1" startColor="gray.200" />
      </HStack>

      <HStack m="2">
        <Skeleton m="2" rounded="full" h="10"></Skeleton>
        <Skeleton px="4" my="4" flex="1" startColor="gray.100" />
      </HStack>
      <HStack m="2">
        <Skeleton m="2" rounded="full" h="10"></Skeleton>
        <Skeleton px="4" my="4" flex="1" startColor="gray.50" />
      </HStack>
    </>
  );
};

export default ChatLoading;
