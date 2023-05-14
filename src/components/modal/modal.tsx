import reactDom from "react-dom";
import React from "react";
import styles from "./modal.module.scss";

export const Modal = (props) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) {
    return null;
  }
  return reactDom.createPortal(
    <>
      <div onClick={onClose} className={styles["modal-overlay"]} />
      <div className={styles.modal}>
        <div>{children}</div>
      </div>
    </>,
    document.body
  );
};
