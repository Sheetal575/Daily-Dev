"use client";

import { useState, useEffect } from "react";
import BlogsCard from "../blogs/blogs-cards";
import styles from "../blogs/blogs.module.scss";
import { get } from "../../services/requests";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [blogData, setBlogData] = useState([]);

  const getAllBlogData = () => {
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
  }, []);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const filteredBlogs = blogData.filter((blog) =>
    blog.tags.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.6em",
        }}
      >
        <div style={{ width: "600px" }}>
          <input
            placeholder="Search here by tag of post"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles["blogs-container"]}>
        {filteredBlogs &&
          filteredBlogs.map((el, index) => <BlogsCard blogdata={el} />)}
      </div>
    </>
  );
};
