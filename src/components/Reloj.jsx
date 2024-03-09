import React, { useState, useEffect } from 'react';

export default function Reloj() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const hours = time.getHours() > 12 ? (time.getHours() - 12).toString().padStart(2, "0") : time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    const ampm = time.getHours() >= 12 ? "PM" : "AM";

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    return (
        <>
            <div className='flex flex-col items-center justify-center '>
                <div className="flex items-baseline text-6xl relative">
                    <div className="flex flex-col items-center">
                        <span>{hours}</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                        <span>{minutes}</span>
                    </div>
                    <span>:</span>
                    <span className="">{seconds}</span>
                    <span className="">{ampm}</span>

                </div>

                <span className='font-medium text-4xl text-zinc-600'>{formattedDate}</span>

            </div>
        </>
    );
}
