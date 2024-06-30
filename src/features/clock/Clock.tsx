import "./styles.css";
import { useState, useEffect } from "react";

type DigitsMappingType = {
  top: string;
  bottom: string;
}
type DigitsMapping = Record<number, DigitsMappingType>;

const DIGITS_MAPPING: DigitsMapping = {
  0: {
    top: "digit-right-border digit-top-border digit-left-border",
    bottom: "digit-bottom-border digit-right-border digit-left-border"
  },
  1: {
    top: "digit-right-border",
    bottom: "digit-right-border",
  },
  2: {
    top: "digit-right-border digit-top-border digit-bottom-border",
    bottom: "digit-top-border digit-left-border digit-bottom-border",
  },
  3: {
    top: "digit-bottom-border digit-right-border digit-top-border",
    bottom: "digit-bottom-border digit-right-border digit-top-border"
  },
  4: {
    top: "digit-bottom-border digit-right-border digit-left-border",
    bottom: "digit-right-border digit-top-border"
  },
  5: {
    top: "digit-bottom-border digit-top-border digit-left-border",
    bottom: "digit-bottom-border digit-right-border digit-top-border"
  },
  6: {
    top: "digit-bottom-border digit-top-border digit-left-border",
    bottom: "digit-bottom-border digit-right-border digit-top-border digit-left-border"
  },
  7: {
    top: "digit-right-border digit-top-border",
    bottom: "digit-right-border"
  },
  8: {
    top: "digit-bottom-border digit-right-border digit-top-border digit-left-border",
    bottom: "digit-bottom-border digit-right-border digit-top-border digit-left-border"
  },
  9: {
    top: "digit-bottom-border digit-right-border digit-top-border digit-left-border",
    bottom: "digit-bottom-border digit-right-border digit-top-border"
  }
}

type DigitClasses = typeof DIGITS_MAPPING[number];

const Digit = ({ num }: { num: number }) => {
  const classes: DigitClasses = DIGITS_MAPPING[num];

  return (
    <div>
      <div className={`digit digit-top ${classes && classes.top}`}></div>
      <div className={`digit digit-bottom ${classes && classes.bottom}`}></div>
    </div>
  )
}

const Separator = () => {
  return (
    <div className="separator">
      <span></span>
      <span></span>
    </div>
  )
}

const getCurrentTime = () => {
  const now = new Date().toLocaleTimeString();
  return now.slice(0, -3).trim();
}

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const [currentHour, setCurrentHour] = useState<string>("");
  const [currentMin, setCurrentMin] = useState<string>("");
  const [currentSec, setCurrentSec] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getCurrentTime();
      const nextValues = next.split(":");

      setCurrentTime(next);
      setCurrentHour(nextValues[0]);
      setCurrentMin(nextValues[1]);
      setCurrentSec(nextValues[2]);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <time className="clock" dateTime={currentTime}>
      <Digit num={+currentHour[0]} />
      <Digit num={+currentHour[1]} />
      <Separator />
      <Digit num={+currentMin[0]} />
      <Digit num={+currentMin[1]} />
      <Separator />
      <Digit num={+currentSec[0]} />
      <Digit num={+currentSec[1]} />
    </time>
  )
}
