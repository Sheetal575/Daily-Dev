"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { useRouter } from "next/navigation";
const Header = () => {
  const [showGreetingMessage, setShowGreetingMessage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowGreetingMessage(false);
    }, 9000);
  }, []);

  const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;

    if (hours < 12) greet = "Morning";
    else if (hours >= 12 && hours <= 17) greet = "Afternoon";
    else if (hours >= 17 && hours <= 24) greet = "Evening";

    return <span>Good {greet}</span>;
  };

  return (
    <div className={styles.header}>
      {showGreetingMessage ? (
        Greetings()
      ) : (
        <button
          className={styles["header-button"]}
          onClick={() => router.push("/")}
        >
          <span className={styles.letter}>Daily Dev</span>
        </button>
      )}
    </div>
  );
};

export default Header;
