import ReadTime from "../../icons/read-time";
import styles from "./blogs.module.scss";
import Button from "../../components/button/button";
import ExternalLink from "../../icons/external-link";
import { useState } from "react";
import BlogDetails from "../blog-details/blog-details";

const BlogsCard = (props) => {
  const { blogdata, getAllBlogData } = props;
  const { title, imgUrl, url, readTime } = blogdata;
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  const readblog = (goToUrl, e) => {
    e.stopPropagation();
    window.open(goToUrl);
  };

  const handleSelectedBlog = () => {
    setIsOpenDetailModal(!isOpenDetailModal);
  };
  return (
    <>
      <div className={styles["blog-card"]} onClick={handleSelectedBlog}>
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
          <Button variant="primary" onClick={(e) => readblog(url, e)}>
            <ExternalLink size={15} color="black" strokeWidth={2} />
          </Button>
        </div>
      </div>
      <BlogDetails
        getAllBlogData={getAllBlogData}
        details={blogdata}
        isOpen={isOpenDetailModal}
        onClose={() => setIsOpenDetailModal(!isOpenDetailModal)}
      />
    </>
  );
};

export default BlogsCard;
