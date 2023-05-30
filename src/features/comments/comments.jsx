import styles from "./comments.module.scss";
import Button from "../../components/button/button";
export const CommentScreen = ({ handleCommentScreen }) => {
  return (
    <div className={styles["comment-screen"]}>
      <div className={styles["comment-screen__heading"]}>
        All Comments(10)
        <Button variant="tertiary" onClick={() => handleCommentScreen()}>
          Back
        </Button>
      </div>
      <div className={styles["comment-screen__content"]}>
        {[...Array(20)].map((comment) => (
          <div className={styles["comment-screen__comment"]}>
            <div>Sheetal Dadhich</div>
            <div>
              Hey devs, ever wish there was a tab to help you stay ahead in the
              ever-changing tech world
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
