import React, { useEffect, useState } from "react";
import gsap from "gsap";
import SignIn from "../Components/authentication/SignIn";
import {
  Box,
  Button,
  Container,
  ScaleFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SignUp from "../Components/authentication/SignUp";
function WelcomePage() {
  const { isOpen, onToggle } = useDisclosure();

  const navigator = useNavigate();
  useEffect(() => {
    //fecth local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigator("/chats");
  }, [navigator]);
  const [show, setShow] = useState(false);
  //Animation
  gsap.fromTo(
    "#square1",
    { y: -200, x: 200 },
    { y: 0, x: 0, duration: 1.25, zIndex: 1, rotation: 45 }
  );
  gsap.fromTo(
    "#square2",
    { y: 200, x: 200 },
    { y: 0, x: 0, duration: 1.5, zIndex: 2, rotation: -45 }
  );
  gsap.fromTo(
    "#picture_login",
    { y: 0, x: 400, rotation: 0, zIndex: 3, scale: 1.5 },
    { y: 0, x: 0, duration: 1.75, zIndex: 3, scale: 1.5 }
  );
  return (
    <Container
      maxW={"100vw"}
      overflow="hidden"
      position="relative"
      className="transition-transform bg-gradient-to-b from-dark-blue to-deep-blue h-[100vh]"
    >
      <Box
        id="login_form"
        position="relative"
        w={{ lg: "33,3%", base: "fit-content" }}
        pt={{ lg: "10", base: "auto" }}
        p={{ lg: "10", base: "10" }}
        ml={{ lg: "28" }}
        flex={{ lg: "flex" }}
        flexDir={{ lg: "column" }}
        justifyContent={{ lg: "justify-end" }}
        shadow="2xl"
        borderRadius={"xl"}
        mt={"10"}
        zIndex={10}
        className="
        card
        card--8
        "
        onMouseLeave={(e) => {
          document.documentElement.style.setProperty("--mouseX8", 0);
          document.documentElement.style.setProperty("--mouseY8", 0);
        }}
        onMouseMove={(e) => {
          let wh = window.innerHeight / 3,
            ww = window.innerWidth / 3;
          document.documentElement.style.setProperty(
            "--mouseX8",
            (e.clientX - ww) / 50
          );
          document.documentElement.style.setProperty(
            "--mouseY8",
            (e.clientY - wh) / 50
          );
          document.querySelectorAll(".parallax").forEach((move) => {
            let moving_vl = move.getAttribute("data-value");
            let x = (e.clientX * moving_vl) / 120;
            let y = (e.clientY * moving_vl) / 120;

            move.style.transform =
              "translateX(" + x + "px) translateY(" + y + "px)";
          });
        }}
      >
        <Box m={0} zIndex={10}>
          <Text
            fontSize={48}
            fontWeight="bold"
            textAlign={"center"}
            textColor="white"
            className="parallax"
            data-value="2"
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-pink-700">
              Zola
            </span>
          </Text>
          <Text
            fontSize={16}
            fontWeight="bold"
            textAlign="center"
            textColor={"white"}
            className="parallax"
            data-value="3"
          >
            ứng dụng mạng xã hội hot nhất hiện nay
          </Text>
        </Box>
        {show ? (
          <SignIn setShow={setShow} isOpen={isOpen} />
        ) : (
          <SignUp setShow={setShow} isOpen={isOpen} />
        )}
        {show ? (
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
                onClick={() => {
                  setShow(!show);
                  onToggle(false);
                }}
              >
                {!show ? "Sign Up" : "Sign In"}
              </Button>
            </span>
          </Text>
        ) : (
          <Text textColor={"white"}>
            already have an account?{" "}
            <span className="font-bold">
              <Button
                variant="link"
                colorScheme={"white"}
                _hover={{
                  bgClip: "text",
                  bgGradient: "linear(to-br,blue.300,red.300)",
                }}
                onClick={() => {
                  setShow(true);
                  onToggle(true);
                }}
              >
                Sign In
              </Button>
            </span>
          </Text>
        )}
      </Box>
      <Box id="picture_login"></Box>
      <Box id="square1"></Box>
      <Box id="square2"></Box>
    </Container>
  );
}

export default WelcomePage;
