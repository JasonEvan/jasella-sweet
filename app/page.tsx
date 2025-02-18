"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Background from "@/components/main-background";
import Home from "@/components/main-content";
import Wish from "@/components/wish-content";
import Location from "@/components/location-content";
import Timer from "@/components/timer-content";
import Gallery from "@/components/gallery-content";
import PreviewTable from "@/components/preview-table";
import GiveWish from "@/components/give-wishes";
import Attendance from "@/components/attendance";
import { IGuestAttendance } from "../lib/dto";
import { ToastContainer } from "react-toastify";

function App() {
  const code = useRef<string>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guest, setGuest] = useState<IGuestAttendance>({
    name: "",
    isAlreadyFilled: false,
    personAttended: 0,
    personInvited: 0,
  });

  const handleAudioPlay = () => {
    const audio = document.getElementById(
      "background-audio"
    ) as HTMLAudioElement;
    if (audio && !isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    code.current = searchParams.get("code");

    if (code.current) {
      fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/guest/${code.current}`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((res) => setGuest(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      <Background>
        <audio loop id="background-audio">
          <source src="/sound.mp3" type="audio/mpeg" />
        </audio>
        <Home handlePlay={handleAudioPlay} />
        <Wish />
        <Location />
        <Timer />
        {guest && guest.name != "" && !guest.isAlreadyFilled && (
          <Attendance
            data={guest}
            setGuest={setGuest}
            code={code.current ?? ""}
          />
        )}
        <Gallery
          title="See My Gallery"
          images={[
            "foto1.jpg",
            "foto2.jpg",
            "foto3.jpg",
            "foto4.jpg",
            "foto5.jpg",
          ]}
          otherClass="mb-44"
        />
        <PreviewTable />
        <GiveWish name={guest && guest.name != "" ? guest.name : ""} />
        <Gallery
          title="Other Gallery"
          images={[
            "foto6.jpg",
            "foto7.jpg",
            "foto8.jpg",
            "foto9.jpg",
            "foto10.jpg",
          ]}
        />
      </Background>
      <ToastContainer />
    </>
  );
}

export default App;
