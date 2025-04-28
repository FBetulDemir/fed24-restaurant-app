import heroVideo from "../assets/sushi-on-fire.mp4";
import "../styles/MainBanner.css";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

const MainBanner = () => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="main-banner">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        src={heroVideo}
        className="video-background"
        type="video/mp4"
      />
      <div className="video-overlay">
        <button className="btn-pause btn-hero" onClick={toggleVideo}>
          {isPaused ? "SPELA UPP" : "PAUSA VIDEO"}
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
