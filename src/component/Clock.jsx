import React, { useEffect, useState } from "react";

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    hour,
    minute,
    second,
  };
};

const Clock = () => {
  const [time, settime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      settime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hourHand = (time.hour % 12) * 30 + (time.minute / 60) * 30;
  const minuteHand = (time.minute + time.second / 60) * 6;
  const secondHand = time.second * 6;

  const hourLine = [];

  for (let i = 0; i < 12; i++) {
    hourLine.push(
      <div
        key={i}
        style={{
          transform: `rotate(${i * 30}deg)`,
        }}
        className={`line`}
      ></div>
    );
  }

  return (
    <div>
      <div className="clock">
        <div className="clock-face">
          <div className="center"></div>
          <div
            className="hand hand-hour"
            style={{
              transform: `rotate(${hourHand}deg)`,
            }}
          ></div>
          <div
            className="hand hand-minute"
            style={{
              transform: `rotate(${minuteHand}deg)`,
            }}
          ></div>
          <div
            className="hand hand-second"
            style={{
              transform: `rotate(${secondHand}deg)`,
            }}
          ></div>
          {hourLine}
          <div className="clock-cover"></div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
