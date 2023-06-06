import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import { Modal } from "../../components/modal/modal";
import Tags from "../../services/tags";
import styles from "./choose-tag-modal.module.scss";
import { get, put } from "../../services/requests";
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from "@mui/material/Snackbar";

export const ChooseTagModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelectedButton = (tag) => {
    const exists = selectedButtons.some((data) => data.id == tag?.id);
    if (exists) {
      setSelectedButtons(selectedButtons.filter((el) => el.id != tag?.id));
    } else {
      setSelectedButtons([...selectedButtons, tag]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getSelectedTags();
    }
  }, [isAuthenticated]);

  const getSelectedTags = () => {
    console.log(user.email);
    get("users")
      .then((res) => {
        const filteredData = res.filter((el) => el.email === user.email);
        console.log(filteredData[0].myTags);
        setSelectedButtons(filteredData[0].myTags);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    const data = {
      selectedTags: selectedButtons,
    };

    if (isAuthenticated) {
      put(`users/${user.email}`, data).then((res) => {
        if (res.status === 200) {
          setOpen(true);
          window.location.reload();
        }
        console.log(res);
      });
    } else {
      loginWithPopup();
    }
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration="3000"
        onClose={() => setOpen(false)}
        message="Changes saved successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
      />
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
                    selectedButtons.some((data) => data.id == el?.id)
                      ? styles["tags-active"]
                      : ""
                  }`}
                  onClick={() => handleSelectedButton(el)}
                >
                  {el.title}
                </button>
              ))}
          </div>
          <div className={styles["choosetag-modal__footer"]}>
            <Button variant="tertiary" onClick={onClose}>
              Skip
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
