"use client";
import { useState, useEffect } from "react";
import styles from "./Greeting.module.css";

export default function Greeting() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [greetings, setGreetings] = useState([]);
  const [speed, setSpeed] = useState(150);

  const getBaseGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    if (time >= 301 && time <= 660) return "Good Morning";
    if (time >= 661 && time <= 960) return "Good Afternoon";
    if (time >= 961 && time <= 1140) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    const base = getBaseGreeting();

    const translations = {
      "Good Morning": [
        "Good Morning!",
        "早安 (Zǎo'ān)!",
        "おはよう (Ohayou)!",
        "Bonjour!",
        "Guten Morgen!",
        "Goedemorgen!",
        "¡Buenos días!",
      ],
      "Good Afternoon": [
        "Good Afternoon!",
        "下午好 (Xiàwǔ hǎo)!",
        "こんにちは (Konnichiwa)!",
        "Bon Après-midi!",
        "Guten Tag!",
        "Goedemiddag!",
        "¡Buenas tardes!",
      ],
      "Good Evening": [
        "Good Evening!",
        "晚上好 (Wǎnshàng hǎo)!",
        "こんばんは (Konbanwa)!",
        "Bonsoir!",
        "Guten Abend!",
        "Goedenavond!",
        "¡Buenas noches!",
      ],
      "Good Night": [
        "Good Night!",
        "晚安 (Wǎn'ān)!",
        "おやすみ (Oyasumi)!",
        "Bonne Nuit!",
        "Gute Nacht!",
        "Welterusten!",
        "¡Buenas noches!",
      ],
    };

    setGreetings(translations[base] || [base]);
  }, []);

  useEffect(() => {
    if (greetings.length === 0) return;

    const current = greetings[index % greetings.length];

    let timer;
    if (isDeleting) {
      setSpeed(80);
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % greetings.length);
        }
      }, speed);
    } else {
      setSpeed(150);
      timer = setTimeout(() => {
        setDisplayText((prev) => current.substring(0, prev.length + 1));
        if (displayText === current) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, greetings, index, speed]);

  return (
    <h1 className={`${styles.typewriter} text-4xl font-bold text-indigo-400`}>
      {displayText}
      <span className={styles.cursor}></span>
    </h1>
  );
}
