"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { useRouter } from "next/navigation";
import Button from "../../components/button/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "../../components/avatar/avatar";

const ProfileDetails = ({ userDetails, handleLogOut }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <div
      className={styles.profile}
      onClick={() => setShowDropDown(!showDropDown)}
    >
      <Avatar
        imgUrl={userDetails?.picture}
        name={userDetails.name}
        size="large"
      />
      {showDropDown && (
        <div className={styles.profile__dropdown}>
          {/* <div className={styles.pointer} /> */}
          <div className={styles["user-details"]}>
            <div className={styles["user-details__container"]}>
              <div className={styles["user-details__name"]}>
                {userDetails.name}
              </div>
              <div className={styles["user-details__emailId"]}>
                {userDetails.email}
              </div>
            </div>
            <hr className={styles.border} />
            <button
              variant="tertiary"
              className={styles["profile__dropdown-menu"]}
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const Header = () => {
  const [showGreetingMessage, setShowGreetingMessage] = useState(true);
  const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();

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

    return user?.name ? (
      <span>
        Good {greet}{" "}
        {user?.name.split(" ")[0].charAt(0).toUpperCase() +
          user?.name.split(" ")[0].slice(1)}
      </span>
    ) : (
      <span>Good {greet}</span>
    );
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
      {isAuthenticated ? (
        <ProfileDetails userDetails={user} handleLogOut={logout} />
      ) : (
        <Button variant="primary" onClick={() => loginWithPopup()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Header;
