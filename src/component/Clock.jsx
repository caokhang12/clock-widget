import React, { useEffect, useState } from "react";

// Hàm lấy thời gian hiện tại
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
  // State lưu thời gian hiện tại
  const [time, settime] = useState(getTime());

  // useEffect cập nhật thời gian mỗi giây
  useEffect(() => {
    setInterval(() => {
      settime(getTime());
    }, 1000);
  }, []);
  /*
  Tính toán góc quay của các kim đồng hồ:
  Mỗi giờ: Số giờ quay 360 độ / 12h = 30 độ + (phút/60) * 30 độ
  Mỗi phút: Số phút quay 360 độ / 60p = 6 độ + (giây/60) * 6 độ
  Mỗi giây: Số giây quay 360 độ / 60s = 6 độ
  Ví dụ: 3h 15p 30s
  Kim giờ: 3 * 30 + (15/60) * 30 = 97.5 độ
  Kim phút: 15 + (30/60) * 6 = 15 + 3 = 18 độ
  */
  const hourHand = (time.hour % 12) * 30 + (time.minute / 60) * 30;
  const minuteHand = (time.minute + time.second / 60) * 6;
  const secondHand = time.second * 6;

  // Tạo danh sách các vạch giờ (12 vạch)
  const hourLine = [];
  for (let i = 0; i < 12; i++) {
    hourLine.push(
      <div
        className="line-container"
        key={i}
        style={{ transform: `rotate(${i * 30}deg)` }}
      >
        {i % 3 === 0 ? (
          <div className="line-number">{i === 0 ? "12" : i}</div>
        ) : (
          ""
        )}
        <div className="line"></div>
      </div>
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
