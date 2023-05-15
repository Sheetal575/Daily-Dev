"use client";
import { BlogService } from "../../services/blogs";
import BlogsCard from "./blogs-cards";
import styles from "./blogs.module.scss";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useRef, useEffect, useContext } from "react";
import { loadFromLocalStorage } from "../../services/blogs";
import BlogDataContext from "../../services/blogContext";
const Blogs = (props) => {
  const firstCardRef = useRef(null);
  const { blogData } = useContext(BlogDataContext);
  // useEffect(() => {
  //   const intro = introJs();

  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: firstCardRef.current,
  //         intro:
  //           "This is the latest techincal blog click on it and go throught it.",
  //         position: "right",
  //       },
  //     ],
  //   });

  //   intro.start();
  // }, []);

  const { searchQuery } = props;
  const filteredBlogs = blogData.filter((blog) =>
    blog.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

export default Blogs;
