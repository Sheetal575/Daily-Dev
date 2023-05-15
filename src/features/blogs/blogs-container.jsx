"use client";

import BlogsCard from "./blogs-cards";
import styles from "./blogs.module.scss";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useRef, useEffect, useContext } from "react";
import BlogDataContext from "../../services/blogContext";
import { useLayoutEffect } from "react";

const Blogs = () => {
  const firstCardRef = useRef(null);
  const { blogData } = useContext(BlogDataContext);

  useLayoutEffect(() => {
    const intro = introJs();

    intro.setOptions({
      steps: [
        {
          element: firstCardRef.current,
          intro:
            "This is the latest techincal blog , hover on it, you will find a button to go to the link of blog. read it , enjoy it.",
          position: "right",
        },
      ],
    });

    intro.start();
  }, []);

  return (
    <div className={styles["blogs-container"]}>
      {blogData &&
        blogData.map((el, index) => (
          <div ref={index == 0 ? firstCardRef : null}>
            <BlogsCard blogdata={el} />
          </div>
        ))}
    </div>
  );
};

export default Blogs;
