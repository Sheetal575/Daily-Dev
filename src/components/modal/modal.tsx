import reactDom from "react-dom";
import React from "react";
import styles from "./modal.module.scss";
import Close from "../../icons/close";
import Button from "../button/button";

export const Modal = (props) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) {
    return null;
  }
  return reactDom.createPortal(
    <>
      <div onClick={onClose} className={styles["modal-overlay"]} />

      <div className={styles.modal}>
        <Button variant="tertiary" onClick={onClose}>
          <Close size={24} strokeWidth={2} color="white" />
        </Button>

        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </>,
    document.body
  );
};
