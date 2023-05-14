import React from "react";
import styles from "./button.module.scss";

const Button = (props) => {
  const { onClick, variant, children } = props;
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} `}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
