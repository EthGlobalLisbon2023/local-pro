import React, { useEffect, useState } from "react";

const Timer = ({ seconds, countUp }: any) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (countUp ? prevTime + 1 : prevTime - 1));
    }, 1000);

    // clear interval on unmount
    return () => clearInterval(intervalId);
  }, [countUp]);

  const formatTime = (time) => {
    const hours = Math.floor(Math.abs(time) / 3600);
    const minutes = Math.floor((Math.abs(time) % 3600) / 60);
    const seconds = Math.abs(time) % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <p className="text-6xl font-zilla">{formatTime(time)}</p>;
};

export default Timer;
