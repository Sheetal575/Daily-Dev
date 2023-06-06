import { useState } from "react";
import styles from "./blog-details.module.scss";
import Button from "../../components/button/button";
import { UpVote } from "../../icons/upvote";
import { BookMark } from "../../icons/bookmark";
import { Comment } from "../../icons/hide";
import { post } from "../../services/requests";
import { useAuth0 } from "@auth0/auth0-react";

export const BlogTools = ({
  handleCommentScreen,
  upvote,
  comments,
  isAuthenticated,
  loginWithPopUp,
  blogId,
  handleUpVote,
  handleBookMark,
}) => {
  const [showFillColor, setShowFillColor] = useState({
    upvote: false,
    bookmark: false,
  });

  const handleAction = (action) => {
    if (isAuthenticated) {
      if (action == "upvote") {
        const res = handleUpVote(blogId);
        console.log(res);
        if (!res) {
          setShowFillColor({
            ...showFillColor,
            [action]: !showFillColor[action],
          });
        }
      }

      if (action == "bookmark") {
        const res = handleBookMark(blogId);
        if (!res) {
          setShowFillColor({
            ...showFillColor,
            [action]: !showFillColor[action],
          });
        }
      }
    } else {
      loginWithPopUp();
    }
  };

  return (
    <div className={styles["blog-tools"]}>
      <Button variant="tertiary" onClick={() => handleAction("bookmark")}>
        <BookMark
          size={22}
          color="#ffff"
          strokeWidth={1.5}
          fill={showFillColor.bookmark ? "#ffff" : "none"}
        />
      </Button>
      <div>
        <Button variant="tertiary" onClick={() => handleAction("upvote")}>
          <UpVote
            size={18}
            color="#ffff"
            strokeWidth={1.5}
            fill={showFillColor.upvote ? "#ffff" : "none"}
          />
        </Button>
        <span>{upvote}</span>
      </div>
      <div>
        <Button variant="tertiary" onClick={() => handleCommentScreen()}>
          <Comment size={24} color="#ffff" />
        </Button>
        <span>{comments?.length}</span>
      </div>
    </div>
  );
};
