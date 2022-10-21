import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import OtpInput from 'react-otp-input';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp({ setShow, isOpening }) {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [OTP, setOTP] = useState({ otp: '' });
  function handleChange(otp) { setOTP({ otp: otp }) }
  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    if (!fullname || !email || !password || !confirmpassword || !username) {
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
        { username, fullname, email, password, pic },
        config
      );
      if (data.verify === false) {
        toast({
          title: "Account not verify. Please account verification",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
      }

      if (data.verify === true) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats");
      }

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

  const submitOTP = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.post(
      "/api/user/:email",
      {
        email: email
      },
      config
    ).then(data => {
      axios.post(
        "/api/user/verify",
        { userId: data.data._id, otp: OTP.otp }
      ).then(data1 => {
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats");
      }).catch(err => console.log(err))

      toast({
        title: "Verification successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    }).catch(err => console.log(err))
  }
  return (
    <ScaleFade initialScale={0.9} in={!isOpening}>
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
          value={fullname}
          placeholder="Enter your full name"
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
          onClick={
            onOpen
          }
          isLoading={loading}
        >
          Sign Up
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify your email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OtpInput
              value={OTP.otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span>-</span>}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={submitOTP}>Confirm</Button>
            <Button onClick={submitHandler} >Send code</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </ScaleFade>
  );
}

export default SignUp;
