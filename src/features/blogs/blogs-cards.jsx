import ReadTime from "../../icons/read-time";
import styles from "./blogs.module.scss";
import Button from "../../components/button/button";
import ExternalLink from "../../icons/external-link";

const BlogsCard = (props) => {
  const { blogdata } = props;
  const { title, imgUrl, url, readTime } = blogdata;

  const readblog = (goToUrl) => {
    window.open(goToUrl);
  };
  return (
    <>
      <div className={styles["blog-card"]}>
        <div className={styles["blog-card__heading"]}>{title}</div>
        <img height={100} src={imgUrl} />
        <div className={styles["blog-card__footer"]}>
          <span className={styles["read-time"]}>
            <ReadTime size={14} color="#97d2ec" strokeWidth={2} />
            {readTime} min
          </span>
          <Button variant="primary" onClick={() => readblog(url)}>
            <ExternalLink size={15} color="black" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BlogsCard;
