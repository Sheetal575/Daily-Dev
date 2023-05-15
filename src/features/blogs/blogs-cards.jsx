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
        <img
          height={100}
          src={
            imgUrl
              ? imgUrl
              : "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
        />
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
