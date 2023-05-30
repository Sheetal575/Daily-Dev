import Button from "../../components/button/button";
import { ChooseTagModal } from "./choose-tag-modal";
import styles from "./choose-tag-modal.module.scss";
import { useState } from "react";

const dumbyTags = [
  {
    id: 0,
    title: "Dev Ops",
    selected: false,
  },
  {
    id: 1,
    title: "Python",
    selected: true,
  },
  //   {
  //     id: 1,
  //     title: "Nextjs",
  //     selected: false,
  //   },
];

const ChooseTagPrompt = () => {
  const [isOpenCustomiseModal, setIsOpenCustomiseModal] = useState(false);
  return (
    <>
      <div className={styles.prompt}>
        <div className={styles["prompt-heading"]}>
          <span>
            Let's super-charge your feed with the content you actually read!
          </span>
          <button
            onClick={() => setIsOpenCustomiseModal(!isOpenCustomiseModal)}
            className={styles["customise-button"]}
          >
            Customise
          </button>
        </div>
        <div className={styles["prompt-tags"]}>
          {dumbyTags.map((el) => (
            <button
              className={`${styles["dumby-tags"]} ${
                el.selected ? styles["dumby-tags-active"] : ""
              }`}
            >
              {el.title}
            </button>
          ))}
        </div>
      </div>
      <ChooseTagModal
        isOpen={isOpenCustomiseModal}
        onClose={() => setIsOpenCustomiseModal(!isOpenCustomiseModal)}
      />
    </>
  );
};

export default ChooseTagPrompt;
