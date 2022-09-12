import { Box, Button, Input, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const navigator = useNavigate();
  return (
    <Box>
      <Box marginY={"2.5rem"} flex={true} flexDir={"column"} zIndex={10}>
        <Input
          type={"text"}
          placeholder="gmail"
          bgColor={"white"}
          borderRadius="lg"
          w="full"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
        <Input
          type={"password"}
          placeholder="password"
          bgColor={"white"}
          borderRadius="lg"
          w="full"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
        <Text
          transitionDuration={"150ms"}
          textAlign="right"
          textColor={"white"}
          _hover={{
            bgClip: "text",
            bgGradient: "linear(to-br,blue.300, pink.400)",
          }}
        >
          forgot password, eh? Press here, bro.
        </Text>
      </Box>
      <Box zIndex={10}>
        <Button
          variant={"link"}
          colorScheme={"yellow"}
          fontWeight={"bold"}
          transition="ease-in-out"
          transitionDuration={150}
          fontSize={32}
          _hover={{
            bgClip: "text",
            bgGradient: "linear(to-br,red.600,yellow.600)",
          }}
          mb="5"
          onClick={() => navigator("/chats")}
        >
          Sign In
        </Button>
        <Text textColor={"white"}>
          don't have an account?{" "}
          <span className="font-bold">
            <Button
              variant="link"
              colorScheme={"white"}
              _hover={{
                bgClip: "text",
                bgGradient: "linear(to-br,blue.300,red.300)",
              }}
            >
              Sign Up
            </Button>
          </span>
        </Text>
      </Box>
    </Box>
  );
}

export default SignIn;
