import React, { useEffect } from "react";
import { message } from "antd";

const CountDownTimer = ({
  hoursMinSecs,
  setIsFinishedTime,
  setIsStarted,
  isStarted,
}) => {
  const { minutes, seconds } = hoursMinSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);
  const [end_time, set_end_time] = React.useState(false);

  React.useEffect(() => {
    setTime([minutes, seconds]);
  }, [hoursMinSecs]);
  const tick = () => {
    if (mins === 0 && secs === 0) {
      message.warning("Test yechish uchun berilgan vaqt tugadi!");
      set_end_time(true);
    }
    // reset()
    else if (mins === 0 && secs === 0) {
      setTime([59, 59]);
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    if (!end_time) {
      if (isStarted) {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
      }
    }
  });

  useEffect(() => {
    if (mins === 0 && secs === 0) {
      setIsFinishedTime(0);
    }
  }, [mins, secs]);

  return (
    <React.Fragment>
      <span
        style={{
          fontSize: "30px",
          color: "#fff",
          backgroundColor: "#434343",
          padding: "0 10px 0 10px",
          border: "0.1px solid #fff",
          borderRadius: "8px",
          position: "absolute",
          top: "10px",
          left:'48%'
        }}
      >
        {`${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`}
      </span>
    </React.Fragment>
  );
};

export default CountDownTimer;
