import styles from "./comments.module.scss";
import Button from "../../components/button/button";
import { Avatar } from "../../components/avatar/avatar";
export const CommentScreen = ({ handleCommentScreen, comments }) => {
  return (
    <div className={styles["comment-screen"]}>
      <div className={styles["comment-screen__heading"]}>
        All Comments({comments?.length})
        <Button variant="tertiary" onClick={() => handleCommentScreen()}>
          Back
        </Button>
      </div>
      <div className={styles["comment-screen__content"]}>
        {comments &&
          comments.map((el) => (
            <div className={styles["comment-screen__comment"]}>
              <div>
                <Avatar name={el?.userName} size="small" />
              </div>
              <div className={styles.comments}>
                <div className={styles.comments__name}>{el?.userName}</div>
                <div className={styles.comments__comment}>{el?.comment}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
