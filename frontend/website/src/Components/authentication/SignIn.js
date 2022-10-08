import {
  Box,
  Button,
  Input,
  ScaleFade,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../providers/ChatProvider";
function SignIn({ setShow, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = ChatState();
  let navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Sign in successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setLoading(false);
      setUser(userInfo);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Sign in failed! Your password or email address is invalid!  ",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <VStack marginY={"2.5rem"} zIndex={10}>
        <Input
          type={"email"}
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          bgColor={"white"}
          borderRadius="lg"
          w="400px"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
        <Input
          type={"password"}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          bgColor={"white"}
          borderRadius="lg"
          w="400px"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
      </VStack>
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
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign In
        </Button>
      </Box>
    </ScaleFade>
  );
}
export default SignIn;
