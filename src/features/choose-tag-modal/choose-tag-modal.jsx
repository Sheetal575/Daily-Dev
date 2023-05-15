import { useState } from "react";
import Button from "../../components/button/button";
import { Modal } from "../../components/modal/modal";
import Tags from "../../services/tags";
import styles from "./choose-tag-modal.module.scss";

export const ChooseTagModal = ({ isOpen, onClose }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleSelectedButton = (buttonId) => {
    if (selectedButtons.includes(buttonId)) {
      setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
    } else {
      setSelectedButtons([...selectedButtons, buttonId]);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles["choosetag-modal"]}>
        <div className={styles["choosetag-modal__heading"]}>
          Make the feed , <span>Your Feed</span>
        </div>
        <div className={styles["choosetag-modal__subheading"]}>
          Supercharge your feed with the personalised content you want.
        </div>
        <div className={styles["choosetag-modal__content"]}>
          {Tags &&
            Tags.map((el) => (
              <button
                className={`${styles.tags} ${
                  selectedButtons.includes(el.id) ? styles["tags-active"] : ""
                }`}
                onClick={() => handleSelectedButton(el.id)}
              >
                {el.title}
              </button>
            ))}
        </div>
        <div className={styles["choosetag-modal__footer"]}>
          <Button variant="tertiary" onClick={onClose}>
            Skip
          </Button>
          <Button variant="primary" onClick={onClose}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
