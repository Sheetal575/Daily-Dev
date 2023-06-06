"use client";

import BlogsCard from "./blogs-cards";
import styles from "./blogs.module.scss";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { useRef, useEffect, useState } from "react";
import { get } from "../../services/requests";
import { useAuth0 } from "@auth0/auth0-react";

const Blogs = () => {
  const { isAuthenticated } = useAuth0();
  const firstCardRef = useRef(null);
  const [blogData, setBlogData] = useState([]);
  const [preferTags, setPreferTags] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const getAllBlogData = () => {
    console.log;
    get("blogs")
      .then((res) => {
        setBlogData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogData();
    if (isAuthenticated) {
      getSelectedTags();
    }
  }, [isAuthenticated]);

  const getSelectedTags = async () => {
    await get("users")
      .then((res) => {
        setPreferTags(res[0].myTags);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(()=>{
  //   const filteredBlogs = blogData.filter((blog) =>
  //   blog.tags.some((tag) =>
  //     preferTags.some((t) => {
  //       const tech = t.title;
  //       console.log(tech);
  //       return tech?.toLowerCase() === tag.toLowerCase();
  //     })
  //   )
  // );
  // },[blogData,preferTags])

  useEffect(() => {
    console.log(preferTags, "prefertags");
    const filteredBlogs = blogData.filter((blog) =>
      blog.tags.some((tag) =>
        preferTags.some((t) => {
          const tech = t.title;
          return tech?.toLowerCase() === tag.toLowerCase();
        })
      )
    );
    console.log(filteredBlogs, "filterBlogs");
    if (filteredBlogs.length) {
      setBlogList(filteredBlogs);
    } else {
      if (!preferTags.length) {
        setBlogList(blogData);
      }
    }
  }, [preferTags, blogData]);

  // useEffect(() => {
  //   if (filteredBlogs.length) {
  //     setBlogData(filteredBlogs);
  //   }
  // }, [filteredBlogs]);
  return (
    <div className={styles["blogs-container"]}>
      {blogList &&
        blogList.map((el, index) => (
          <BlogsCard getAllBlogData={getAllBlogData} blogdata={el} />
        ))}
    </div>
  );
};

export default Blogs;
