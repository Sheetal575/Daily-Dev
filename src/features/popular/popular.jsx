"use client";
import { useState, useEffect } from "react";
import styles from "../blogs/blogs.module.scss";
import BlogsCard from "../blogs/blogs-cards";
import { get } from "../../services/requests";
import { CircularProgress } from "@mui/material";

const Popular = () => {
  const [blogData, setBlogData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);
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

  useEffect(() => {
    const filteredBlogs = blogData.filter((blog) => blog.upVote >= 2);

    if (filteredBlogs.length > 0) {
      setIsDataFetched(true);
    }
    setFilteredData(filteredBlogs);
  }, [blogData]);

  if (!dataFetched) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  return (
    <>
      {filterData.length ? (
        <div className={styles["blogs-container"]}>
          {filterData.map((el, index) => (
            <BlogsCard blogdata={el} />
          ))}
        </div>
      ) : (
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          No Blog Found
        </div>
      )}
    </>
  );
};

export default Popular;
