import React, { useState, useEffect } from "react";

const gradientMap = {
  gold: "bg-gradient-to-b from-[#FFD700] to-[#FFFBEA]",
  silver: "bg-gradient-to-b from-[#B0BEC5] to-[#F5F5F5]",
  bronze: "bg-gradient-to-b from-[#BCAAA4] to-[#F5F5F5]",
};

const TicketCard = ({
  prize = "Main prize",
  amount = "$60,000,000",
  nextDraw = "2025-07-15T22:30:00", // Use ISO format for reliability
  color = "gold",
  buttonText = "Play Now",
}) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const nextDrawDate = new Date(nextDraw);

    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = nextDrawDate - now;
      if (timeDiff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(interval);
  }, [nextDraw]);

  return (
    <div className="relative w-80 rounded-2xl shadow-xl overflow-hidden bg-white flex flex-col">
      {/* Side Perforations */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 pointer-events-none">
        <div className="w-7 h-12 bg-transparent rounded-full shadow-inner border border-white/40"></div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 pointer-events-none">
        <div className="w-7 h-12 bg-transparent rounded-full shadow-inner border border-white/40"></div>
      </div>
      {/* Gradient Top */}
      <div className={`p-6 ${gradientMap[color]} text-center`}>
        <div className="uppercase text-lg font-semibold text-gray-700 opacity-80">{prize}</div>
        <div className="text-4xl font-extrabold font-title text-gray-900 mt-2 drop-shadow">{amount}</div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-6">
        <div className="text-center mb-2">
          <div className="text-gray-700 font-semibold">Next draw:</div>
          <div className="text-sm text-gray-500">{nextDraw}</div>
        </div>
        {/* Countdown */}
        <div className="flex justify-center gap-2 my-2">
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-gray-900">{countdown.days}</div>
            <div className="text-xs text-gray-500">Days</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-gray-900">{countdown.hours}</div>
            <div className="text-xs text-gray-500">Hours</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-gray-900">{countdown.minutes}</div>
            <div className="text-xs text-gray-500">Min</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
            <div className="text-xl font-bold text-gray-900">{countdown.seconds}</div>
            <div className="text-xs text-gray-500">Sec</div>
          </div>
        </div>
        {/* Button */}
        <button
          className={`mt-4 w-full py-2 rounded-lg font-bold shadow-md transition ${
            color === "gold"
              ? "bg-gradient-to-b from-[#FFD700] to-[#FFC300] text-gray-900 hover:from-[#FFC300]"
              : color === "silver"
              ? "bg-gradient-to-b from-[#B0BEC5] to-[#CFD8DC] text-gray-900 hover:from-[#90A4AE]"
              : "bg-gradient-to-b from-[#BCAAA4] to-[#D7CCC8] text-gray-900 hover:from-[#A1887F]"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
