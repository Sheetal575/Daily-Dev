import { Modal } from "../../components/modal/modal";
import styles from "./invite-people.module.scss";
import Button from "../../components/button/button";
import Copy from "../../icons/copy";

export const InvitePeople = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles["invite-modal"]}>
        <div className={styles["invite-modal__heading"]}>Invite People</div>
        <span>
          We are thrilled to introduce you to the Daily Dev Blog Project, a
          dynamic initiative that aims to foster a thriving community of
          developers who passionately share their knowledge, experiences, and
          insights on a daily basis. By documenting our programming journeys, we
          can collectively accelerate our growth, inspire others, and create a
          rich repository of expertise.
        </span>
        <div className={styles["invite-modal__input"]}>
          <input value="https://daily.dev/" disabled />
          <Button variant="tertiary">
            <Copy size={23} color="#fff" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
