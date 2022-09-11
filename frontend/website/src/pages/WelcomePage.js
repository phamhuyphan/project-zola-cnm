import React from "react";
import gsap from "gsap";
function WelcomePage() {
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
    <div
      className="bg-gradient-to-b from-dark-blue to-deep-blue w-[100vw] h-[100vh] 
    relative overflow-hidden "
    >
      <div
        id="login_form"
        className="
        card
        card--8
        relative
        lg:pt-10
        lg:w-1/3
        lg:ml-28
        lg:flex
        lg:flex-col
        lg:justify-end
        
        w-fit
        m-auto
        z-[10]
        mt-24
        shadow-2xl
        p-10
        rounded-xl
        "
        onMouseLeave={(e) => {
          document.documentElement.style.setProperty("--mouseX8", 0);
          document.documentElement.style.setProperty("--mouseY8", 0);
        }}
        onMouseMove={(e) => {
          var wh = window.innerHeight / 3,
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
            var moving_vl = move.getAttribute("data-value");
            var x = (e.clientX * moving_vl) / 120;
            var y = (e.clientY * moving_vl) / 120;

            move.style.transform =
              "translateX(" + x + "px) translateY(" + y + "px)";
          });
        }}
      >
        <div className="m-0 z-10">
          <h1
            className="
        text-[48px] font-bold text-white parallax text-center
        "
            data-value="2"
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-pink-700">
              Zola
            </span>
          </h1>
          <p
            className=" text-[16px] font-bold text-white parallax  text-center"
            data-value="3"
          >
            ứng dụng mạng xã hội hot nhất hiện nay
          </p>
        </div>
        <div className="my-10 flex flex-col z-10">
          <input
            type={"text"}
            placeholder="gmail"
            className="bg-white text-gray-500  rounded-xl w-full h-[45px] p-3 mb-5
          "
          />
          <input
            type={"password"}
            placeholder="password"
            className="bg-white text-gray-500 rounded-xl w-full h-[45px] p-3"
          />
          <a
            className="duration-150 transition-colors text-right text-white hover:text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-pink-400"
            href="#"
          >
            forgot password, eh? Press here, bro.
          </a>
        </div>
        <div className=" z-10">
          <button
            className="mb-5 text-[32px] font-bold text-yellow-400 
          ease-in-out duration-100 transition-colors
          hover:text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-yellow-500"
          >
            Sign In
          </button>
          <p className="text-white">
            don't have an account?{" "}
            <span className="font-bold">
              <a
                className="hover:text-transparent bg-clip-text bg-gradient-to-br from-blue-800 to-pink-700"
                href="#"
              >
                Sign Up
              </a>
            </span>
          </p>
        </div>
      </div>
      <div id="picture_login"></div>
      <div id="square1"></div>
      <div id="square2"></div>
    </div>
  );
}

export default WelcomePage;
