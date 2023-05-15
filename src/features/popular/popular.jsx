"use client";
import BlogDataContext from "../../services/blogContext";
import { useContext } from "react";
import styles from "../blogs/blogs.module.scss";
import BlogsCard from "../blogs/blogs-cards";

const Popular = () => {
  const { blogData } = useContext(BlogDataContext);
  const filteredBlogs = blogData.filter((blog) => blog?.isPopular);

  return (
    <div className={styles["blogs-container"]}>
      {filteredBlogs &&
        filteredBlogs.map((el, index) => (
          <div ref={null}>
            <BlogsCard blogdata={el} />
          </div>
        ))}
    </div>
  );
};

export default Popular;
