/* import React from "react";
import Countdown, { zeroPad } from "react-countdown";

interface CountdownTimerProps {
  validityPeriod: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ validityPeriod }) => {
  // Calcula la fecha de expiración a partir del período de validez en días
  const expirationDate = new Date(Date.now() + validityPeriod * 24 * 60 * 60 * 1000);

  // Renderizador personalizado para el temporizador
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Renderiza cualquier cosa cuando se completa el temporizador
      return <span>Descuento expirado</span>;
    } else {
      // Renderiza la cuenta regresiva
      return (
        <span>
          {zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
        </span>
      );
    }
  };

  return <Countdown date={expirationDate} renderer={renderer} />;
};

export default CountdownTimer;
 */



/* import React from "react";
import Countdown, { zeroPad } from "react-countdown";

interface CountdownTimerProps {
  validityPeriod: number; // En horas
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ validityPeriod }) => {
  // Calcula la fecha de expiración a partir del período de validez en horas
  const expirationDate = new Date(Date.now() + validityPeriod * 60 * 60 * 1000);

  // Renderizador personalizado para el temporizador
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Renderiza cualquier cosa cuando se completa el temporizador
      return <span>Descuento expirado</span>;
    } else {
      // Renderiza la cuenta regresiva
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

export default CountdownTimer; */



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

