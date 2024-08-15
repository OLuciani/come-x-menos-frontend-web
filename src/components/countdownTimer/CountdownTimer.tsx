import React from "react";
import Countdown, { zeroPad } from "react-countdown";

interface CountdownTimerProps {
  startDateTime: Date; // Fecha y hora de inicio
  durationDays: number; // Duración en días
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDateTime, durationDays }) => {
  const expirationDate = new Date(new Date(startDateTime).getTime() + durationDays * 24 * 60 * 60 * 1000);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Descuento expirado</span>;
      
    } else {
      return (
        <span>
          {days > 0 && `${zeroPad(days)}d `}
          {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
        </span>
      );
    }
  };

  return <Countdown date={expirationDate} renderer={renderer} />;
};

export default CountdownTimer;

