import {
  Box,
  Button,
  Input,
  ScaleFade,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp({ setShow, isOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  let navigate = useNavigate();

  function postDetails(pics) {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please select a picture",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-chit");
      data.append("cloud_name", "voluu");
      fetch("https://api.cloudinary.com/v1_1/voluu/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select a (another) picture",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword || !username) {
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

    if (password !== confirmpassword) {
      toast({
        title: "The passwords do not match",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { username, name, email, password, pic },
        config
      );
      toast({
        title: "Sign up successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Sign up failed " + error,
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <ScaleFade initialScale={0.9} in={!isOpen}>
      <VStack marginY={"2.5rem"} zIndex={10} spacing={5} align="stretch">
        <Input
          type={"name"}
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          bgColor={"white"}
          borderRadius="lg"
          w="400px"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          mb={0}
          textColor={"gray.500"}
        />
        <Input
          type={"name"}
          value={name}
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          bgColor={"white"}
          borderRadius="lg"
          w="400px"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
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
        <Input
          type={"password"}
          placeholder="confirm your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmpassword}
          bgColor={"white"}
          borderRadius="lg"
          w="400px"
          h={45}
          marginBottom={"1.25rem"}
          padding="3"
          textColor={"gray.500"}
        />
        <Input
          type="file"
          accept="image/*"
          p="1.5"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </VStack>
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
          Sign Up
        </Button>
      </Box>
    </ScaleFade>
  );
}

export default SignUp;
