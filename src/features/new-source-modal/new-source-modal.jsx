import { Modal } from "../../components/modal/modal";
import styles from "./new-source-modal.module.scss";
import Close from "../../icons/close";
import Button from "../../components/button/button";
import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { post } from "../../services/requests";
import { Snackbar } from "@mui/material";
export const NewSourceModal = ({ isOpen, onClose }) => {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [newSource, setNewSource] = useState({});
  const [showMessage, setShowMessage] = useState({
    error: false,
    success: false,
  });
  const [open, setOpen] = useState(false);
  const handleInputChange = (e) => {
    setNewSource((prevSource) => {
      return { ...prevSource, [e.target.name]: e.target.value };
    });
  };

  const onpost = () => {
    if (isAuthenticated) {
      if (
        !newSource.imgUrl &&
        !newSource.title & !newSource.description & !newSource.tags
      ) {
        return setShowMessage({ error: true, success: false });
      }
      onSubmit(newSource);
    } else {
      loginWithPopup();
    }
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

  const onSubmit = (source) => {
    const newtag = source.tags;
    const data = {
      title: source.title,
      description: newSource.description,
      tags: newtag.split(","),
      img: source.imgUrl,
      url: source.url,
      readTime: source.readTime,
    };

    post("blogs", data)
      .then((res) => {
        setOpen(true);
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration="3000"
        onClose={() => setOpen(false)}
        message="Source added successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className={styles["source-modal"]}>
          <div className={styles["source-modal__heading"]}>
            Suggest New Source
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
            Have an idea for a new source? Insert its link below to add it to
            the feed.
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
            <input
              name="tags"
              autoComplete="off"
              onChange={handleInputChange}
              placeholder="enter tags(seperated by comma)*"
            />
            <textarea
              name="description"
              style={{ height: "60px" }}
              onChange={handleInputChange}
              autoComplete="off"
              required
              placeholder="enter description*"
            />
          </div>
          <div className={styles["source-modal__footer"]}>
            <Button onClick={onpost} variant="primary">
              Post
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
