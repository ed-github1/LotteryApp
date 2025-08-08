import React, { useEffect, useState } from 'react';

function getTimeRemaining(targetDate) {
    const now = new Date();
    const end = new Date(targetDate);
    const total = end - now;
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
}

const DrawCountdown = ({ drawDate }) => {
    const [time, setTime] = useState(getTimeRemaining(drawDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTimeRemaining(drawDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [drawDate]);

    if (!drawDate || time.total <= 0) {
        return (
            <div className="flex gap-2 items-center justify-center">
                <span className="text-gray-400 font-bold">Draw closed</span>
            </div>
        );
    }

    return (
        <div className="flex gap-4 items-center justify-center">
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#FFD700]">{time.days}</span>
                <span className="text-xs text-white">Days</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#FFD700]">{time.hours}</span>
                <span className="text-xs text-white">Hours</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#FFD700]">{time.minutes}</span>
                <span className="text-xs text-white">Min</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-[#FFD700]">{time.seconds}</span>
                <span className="text-xs text-white">Sec</span>
            </div>
        </div>
    );
};

export default DrawCountdown;
