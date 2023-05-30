"use client";

import BlogDataContext from "../../services/blogContext";
import { useState, useContext } from "react";
import BlogsCard from "../blogs/blogs-cards";
import styles from "../blogs/blogs.module.scss";

export const Search = () => {
  const { blogData } = useContext(BlogDataContext);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const filteredBlogs = blogData.filter((blog) =>
    blog.tag.some((tag) =>
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
          filteredBlogs.map((el, index) => (
            <div ref={null}>
              <BlogsCard blogdata={el} />
            </div>
          ))}
      </div>
    </>
  );
};
