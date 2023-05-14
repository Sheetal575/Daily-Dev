import { Modal } from "../../components/modal/modal";
import styles from "./new-source-modal.module.scss";
import Close from "../../icons/close";
import Button from "../../components/button/button";
import { useState, useContext } from "react";
import BlogDataContext from "../../services/blogContext";

export const NewSourceModal = ({ isOpen, onClose }) => {
  const [newSource, setNewSource] = useState({});
  const { blogData, setBlogData } = useContext(BlogDataContext);
  const [showMessage, setShowMessage] = useState({
    error: false,
    success: false,
  });
  const handleInputChange = (e) => {
    setNewSource((prevSource) => {
      return { ...prevSource, [e.target.name]: e.target.value };
    });
  };

  console.log(showMessage);

  const onpost = () => {
    if (!newSource.imgUrl && !newSource.title) {
      return setShowMessage({ error: true, success: false });
    }
    setShowMessage({ error: false, success: true });
    setBlogData([...blogData, newSource]);

    setTimeout(() => {
      setNewSource({});
      onClose();
      setShowMessage({ error: false, success: false });
    }, 1000);
  };

  const getMessage = (message) => {
    return message.error
      ? "Please fill all the required fields"
      : "Your suggest blog saved successfully";
  };

  const handleClose = () => {
    setShowMessage({ error: false, success: false });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles["source-modal"]}>
        <div className={styles["source-modal__heading"]}>
          Suggest New Source
          <Button onClick={handleClose} variant="secondary">
            <Close
              className={styles.icon}
              size={20}
              color="#fff"
              strokeWidth={1.2}
            />
          </Button>
        </div>
        <div className={styles["source-modal__content"]}>
          {(showMessage.error || showMessage.success) && (
            <div
              className={`${styles["message"]} ${
                showMessage.error ? styles["message-error"] : ""
              } ${showMessage.success ? styles["message-success"] : ""}`}
            >
              {getMessage(showMessage)}
            </div>
          )}
          Have an idea for a new source? Insert its link below to add it to the
          feed.
          <input
            name="title"
            onChange={handleInputChange}
            autoComplete="off"
            required
            placeholder="give your blog a title*"
          />
          <input
            name="url"
            onChange={handleInputChange}
            autoComplete="off"
            required
            placeholder="paste url*"
          />
          <input
            name="imgUrl"
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="image url (optional)"
          />
          <input
            name="readTime"
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="estimated read time in minutes (optional)"
          />
        </div>
        <div className={styles["source-modal__footer"]}>
          <Button onClick={onpost} variant="primary">
            Post
          </Button>
        </div>
      </div>
    </Modal>
  );
};
