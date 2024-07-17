import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRemainingTime } from "../../redux/cartSlice";

const ItemCountdown = ({ itemId }) => {
  const remainingTime = useSelector((state) =>
    selectRemainingTime(state, itemId)
  );
  const [displayTime, setDisplayTime] = useState(remainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime((prevTime) => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayTime(remainingTime);
  }, [remainingTime]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    return `${minutes} phút ${seconds} giây`;
  };

  const getColorClass = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    if (minutes >= 4) {
      return "text-green-500"; // 4-5 minutes: green
    } else if (minutes >= 3) {
      return "text-orange-500"; // 3-4 minutes: orange
    } else if (minutes >= 2) {
      return "text-yellow-500"; // 2-3 minutes: yellow
    } else {
      return "text-red-500"; // 0-2 minutes: red
    }
  };

  return (
    <div className="font-semibold">
      Thời gian còn lại:{" "}
      <p className={getColorClass(displayTime)}>{formatTime(displayTime)}</p>
    </div>
  );
};

export default ItemCountdown;
