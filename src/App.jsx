import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sunset from "./assets/background-sunset.jpg";
import night from "./assets/background-night.jpg";
import regular from "./assets/background.jpg";

function App() {
  const [sunsetTime, setSunsetTime] = useState(null);
  const [myLocation, setMyLocation] = useState(null);

  const currentDate = new Date();
  const currentTime = currentDate.getHours();

  let background;

  console.log("current time: " + currentTime);
  console.log("sunset time: " + sunsetTime);

  if (currentTime == sunsetTime) {
    background = sunset;
  } else if (currentTime > sunsetTime) {
    background = night;
  } else {
    background = regular;
  }

  const bgStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: -1,
    top: 0,
    left: 0,
    // opacity: 0.9,
  };

  const textColourClass = currentTime >= sunsetTime ? "night-text" : "day-text"; // pick font colour based on time of day

  return (
    <div className={textColourClass}>
      <div style={bgStyle}></div> {/* background image */}
      <WeatherInfo
        setSunsetTime={setSunsetTime}
        setMyLocation={setMyLocation}
      />
      <ToastContainer transition={Flip} />
      {currentTime == sunsetTime && (
        <p className="yourLocationStatus">
          Currently sunset at your location. ({myLocation})
        </p>
      )}
      {currentTime > sunsetTime && (
        <p className="yourLocationStatus">
          Currently night time at your location. ({myLocation})
        </p>
      )}
      {currentTime < sunsetTime && (
        <p className="yourLocationStatus">
          Currently day time at your location. ({myLocation})
        </p>
      )}
    </div>
  );
}

export default App;
