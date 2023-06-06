import { Modal } from "../../components/modal/modal";
import styles from "./blog-details.module.scss";
import ChooseTagPrompt from "../choose-tag-modal/choose-tag-prompt";
import Button from "../../components/button/button";
import ExternalLink from "../../icons/external-link";
import Copy from "../../icons/copy";
import { useState } from "react";
import { CommentScreen } from "../comments/comments";
import { capitalizeName, handleCopy } from "../../utilites/helper";
import { post, put } from "../../services/requests";
import { BlogTools } from "./blog-tools";
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from "@mui/material/Snackbar";

const BlogOverview = ({ title, imgUrl, tags, description }) => {
  return (
    <div className={styles.overview}>
      <div className={styles["overview__heading"]}>
        <b>{title}</b>
      </div>
      <div className={styles["overview__description"]}>{description}</div>
      <div className={styles["overview__tags"]}>
        {tags.map((el) => (
          <div>#{el}</div>
        ))}
      </div>
      <div className={styles["overview__img"]}>
        <img src={imgUrl} />
      </div>
    </div>
  );
};
const BlogActions = ({ url }) => {
  const readblog = (goToUrl) => {
    window.open(goToUrl);
  };
  return (
    <div>
      <Button variant="secondary" onClick={() => readblog(url)}>
        Read Post
        <ExternalLink size={15} color="white" strokeWidth={2} />
      </Button>
    </div>
  );
};

const BlogShareOptions = ({ url }) => {
  const [toolTipText, setToolTipText] = useState("");
  const handleCopyUrl = () => {
    handleCopy(url);
    setToolTipText("Copied!");
    setTimeout(() => {
      setToolTipText("");
    }, 1000);
  };
  return (
    <div className={styles["share-option"]}>
      <span> Would you recommed this post?</span>
      <div className={styles["share-option__copyfield"]}>
        <input value={url} disabled />
        <div
          className={styles["copy-container"]}
          style={{ position: "relative" }}
        >
          <Button variant="tertiary" onClick={() => handleCopyUrl()}>
            <Copy size={23} color="#fff" strokeWidth={2} fill="none" />
          </Button>
          {toolTipText && <div className={styles.tooltip}>{toolTipText}</div>}
        </div>
      </div>
    </div>
  );
};

const BlogComments = ({
  blogId,
  postComment,
  user,
  isAuthenticated,
  loginWithPopUp,
}) => {
  const [commentValue, setCommentValue] = useState("");

  const handleCommentValue = (val) => {
    setCommentValue(val);
  };

  const sumbit = async () => {
    if (isAuthenticated) {
      const data = {
        blogId: blogId,
        userName: capitalizeName(user?.name),
        comment: commentValue,
      };

      await postComment(data);
      setCommentValue("");
    } else {
      loginWithPopUp();
    }
  };

  return (
    <div className={styles.comments}>
      <input
        placeholder="share your thoughts"
        value={commentValue}
        onChange={(e) => handleCommentValue(e.target.value)}
      />
      <Button isDisabled={!commentValue} variant="primary" onClick={sumbit}>
        post
      </Button>
    </div>
  );
};

const BlogSimilar = () => {
  return (
    <div className={styles["similar-blogs"]}>
      <div className={styles["similar-blogs__heading"]}>You might like</div>
      <div className={styles["similar-blogs__content"]}>
        {[...Array(4)].map((el) => (
          <div className={styles["similar-blogs__blog"]}>
            <div>
              Learn how to develop event gh hj h driven architecture
              <button variant="tertiary" onClick={() => readblog(url)}>
                <ExternalLink size={15} color="#fff" strokeWidth={2} />
              </button>
            </div>
            <span>27 upvotes</span>
          </div>
        ))}
      </div>
      <div className={styles["similar-blogs__button"]}>
        <Button variant="tertiary">View all</Button>
      </div>
    </div>
  );
};

const BlogDetails = (props) => {
  const { details, isOpen, onClose, getAllBlogData } = props;
  const [isOpenCommentScreen, setIsOpenCommentScreen] = useState(false);
  const { isAuthenticated, loginWithPopup, user } = useAuth0();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  console.log(user);
  const handleCommentScreen = () => {
    setIsOpenCommentScreen(!isOpenCommentScreen);
  };
  const [upVoted, setUpVoted] = useState(false);

  const postComment = (commentData) => {
    post("comments", commentData)
      .then((res) => {
        getAllBlogData();
      })
      .catch((err) => console.log(err));
  };

  const handleUpVote = (id) => {
    const data = {
      blogId: id,
      email: user?.email,
    };
    post("upvote", data).then((res) => {
      if (res.errorMessage) {
        setOpen(true);
        setMessage(res.errorMessage);
      } else {
        setUpVoted(true);
        alert("upvoted");
        setOpen(true);
        setMessage("UpVoted SuccessFully");
        getAllBlogData();
      }
    });

    return upVoted;
  };

  const handleBookMark = (id) => {
    const data = {
      blogId: id,
    };
    put(`users/bookmark/${user.email}`, data).then((res) => {
      if (res) {
        setOpen(true);
        setMessage(res);
      }
    });
  };

  console.log(open);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Snackbar
          open={open}
          autoHideDuration="3000"
          onClose={() => setOpen(false)}
          message={message}
          anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
        />
        <div className={styles["blog-details"]}>
          <div className={styles["blog-details__overview"]}>
            <ChooseTagPrompt />
            <BlogOverview
              title={details?.title}
              imgUrl={details?.imgUrl}
              tags={details?.tags}
              description={details?.description}
            />
            <BlogComments
              isAuthenticated={isAuthenticated}
              loginWithPopUp={loginWithPopup}
              blogId={details._id}
              postComment={postComment}
              user={user}
            />
          </div>
          <div className={styles["blog-details__actions"]}>
            {isOpenCommentScreen ? (
              <CommentScreen
                handleCommentScreen={handleCommentScreen}
                comments={details.comments}
              />
            ) : (
              <>
                <BlogActions url={details?.url} />
                <BlogShareOptions url={details?.url} />
                <BlogTools
                  handleCommentScreen={handleCommentScreen}
                  upvote={details.upVote}
                  comments={details.comments}
                  isAuthenticated={isAuthenticated}
                  loginWithPopUp={loginWithPopup}
                  blogId={details?._id}
                  handleUpVote={handleUpVote}
                  handleBookMark={handleBookMark}
                />
                <BlogSimilar />
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogDetails;
