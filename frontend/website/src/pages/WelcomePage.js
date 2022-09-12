import React from "react";
import gsap from "gsap";
import SignIn from "../Components/authentication/SignIn";
import { Box, Container, Text } from "@chakra-ui/react";
function WelcomePage() {
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
      className="bg-gradient-to-b from-dark-blue to-deep-blue h-[100vh]"
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
        m={"auto"}
        mt={"24"}
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
        <SignIn />
      </Box>
      <Box id="picture_login"></Box>
      <Box id="square1"></Box>
      <Box id="square2"></Box>
    </Container>
  );
}

export default WelcomePage;
