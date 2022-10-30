import React, { useEffect, useId, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { Peer } from "peerjs";
import { Checkbox } from "@chakra-ui/react";

export default function CallPage() {
  const { caller } = useParams();
  let localStream;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const peer = new Peer(userInfo._id);
    peer.on("open", (id) => {
      openStream().then((stream) => {
        playStream("me", stream);
        localStream = stream;
        if (caller != "null") {
          const call = peer.call(caller, stream);
          call.on("stream", (remoteStream) => playStream("en", remoteStream));
          peer.on("disconnected", () => {
            console.log("Clossssssss");
          });
        } else {
          peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (remoteStream) => playStream("en", remoteStream));
            peer.on("disconnected", () => {
              console.log("Clossssssss");
            });
          });
        }
      });
    });
  }, []);

  function openStream() {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
  }

  function playStream(idVideo, stream) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.play();
  }

  let stateVideo = true;
  const video = () => {
    localStream.getVideoTracks()[0].enabled = !stateVideo;
    stateVideo = !stateVideo;
  };
  let stateSound = true;
  const sound = () => {
    localStream.getAudioTracks()[0].enabled = !stateSound;
    stateSound = !stateSound;
  };

  return (
    <div>
      <video className="w-20 h-20" id="me" muted></video>
      <video className="w-150 h-150" id="en"></video>

      <div className="flex flex-row justify-around">
        <div>
          Tat Mic
          <input type="checkbox" onClick={sound}></input>
        </div>
        <div>
          Tat video
          <input type="checkbox" onClick={video}></input>
        </div>

        <button
          className=" bg-slate-400"
          onClick={() => {
            const peer = new Peer(userInfo._id);
            peer.destroy();
          }}
        >
          Out
        </button>
      </div>
    </div>
  );
}
