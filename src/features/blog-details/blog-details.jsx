import { Modal } from "../../components/modal/modal";
import styles from "./blog-details.module.scss";
import ChooseTagPrompt from "../choose-tag-modal/choose-tag-prompt";
import Button from "../../components/button/button";
import ExternalLink from "../../icons/external-link";
import Copy from "../../icons/copy";
import { UpVote } from "../../icons/upvote";
import { BookMark } from "../../icons/bookmark";
import { Comment } from "../../icons/hide";
import { useState } from "react";
import { CommentScreen } from "../comments/comments";

const BlogOverview = ({ title, imgUrl, tags }) => {
  return (
    <div className={styles.overview}>
      <div className={styles["overview__heading"]}>
        <b>{title}</b>
      </div>
      <div className={styles["overview__description"]}>
        TLDRVite 4.3 is out! The resolve logic got streamlined, improving hot
        paths and implementing smarter caching for finding, TS config files, and
        resolved URL in general.
      </div>
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
  const [showFillColor, setFillColor] = useState(false);

  const handleCopyUrl = () => {
    setFillColor(!showFillColor);
  };
  return (
    <div className={styles["share-option"]}>
      <span> Would you recommed this post?</span>
      <div className={styles["share-option__copyfield"]}>
        <input value={url} disabled />
        <Button variant="tertiary" onClick={() => handleCopyUrl()}>
          <Copy
            size={23}
            color="#fff"
            strokeWidth={2}
            fill={showFillColor ? "#ffff" : "none"}
          />
        </Button>
      </div>
    </div>
  );
};

const BlogTools = ({ handleCommentScreen }) => {
  const [showFillColor, setShowFillColor] = useState({
    upvote: false,
    bookmark: false,
  });

  const handleAction = (action) => {
    setShowFillColor({ ...showFillColor, [action]: !showFillColor[action] });
  };
  return (
    <div className={styles["blog-tools"]}>
      <div>
        <Button variant="tertiary" onClick={() => handleAction("upvote")}>
          <UpVote
            size={18}
            color="#ffff"
            strokeWidth={1.5}
            fill={showFillColor.upvote ? "#ffff" : "none"}
          />
        </Button>
        <span>{12}</span>
      </div>
      <div>
        <Button variant="tertiary" onClick={() => handleAction("bookmark")}>
          <BookMark
            size={22}
            color="#ffff"
            strokeWidth={1.5}
            fill={showFillColor.bookmark ? "#ffff" : "none"}
          />
        </Button>
        <span>{12}</span>
      </div>
      <div>
        <Button variant="tertiary" onClick={() => handleCommentScreen()}>
          <Comment size={24} color="#ffff" />
        </Button>
        <span>{12}</span>
      </div>
    </div>
  );
};

const BlogComments = () => {
  return (
    <div className={styles.comments}>
      <input placeholder="share your thoughts" />
      <Button variant="primary">post</Button>
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
  const { details, isOpen, onClose } = props;
  const [isOpenCommentScreen, setIsOpenCommentScreen] = useState(false);

  const handleCommentScreen = () => {
    setIsOpenCommentScreen(!isOpenCommentScreen);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles["blog-details"]}>
        <div className={styles["blog-details__overview"]}>
          <ChooseTagPrompt />
          <BlogOverview
            title={details?.title}
            imgUrl={details?.imgUrl}
            tags={details?.tag}
          />
          <BlogComments />
        </div>
        <div className={styles["blog-details__actions"]}>
          {isOpenCommentScreen ? (
            <CommentScreen handleCommentScreen={handleCommentScreen} />
          ) : (
            <>
              <BlogActions url={details?.url} />
              <BlogShareOptions url={details?.url} />
              <BlogTools handleCommentScreen={handleCommentScreen} />
              <BlogSimilar />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BlogDetails;
