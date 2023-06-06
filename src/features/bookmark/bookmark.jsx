"use client";
import { useState, useEffect } from "react";
import styles from "../blogs/blogs.module.scss";
import BlogsCard from "../blogs/blogs-cards";
import { get } from "../../services/requests";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";

const BookMark = () => {
  const [blogData, setBlogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataFetched, setIsDataFetched] = useState(false);
  const { user } = useAuth0();

  const getAllBlogData = () => {
    get("blogs")
      .then((res) => {
        setBlogData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBookMarkData = () => {
    console.log(blogData, "blogData");
    get("users")
      .then((res) => {
        const bookmarkedIds = res.filter((el) => el.email == user?.email);
        // Filter the blogData array based on the bookmarkedIds
        const filteredBlogData = blogData.filter((blog) =>
          bookmarkedIds[0].bookMark.includes(blog._id)
        );
        // Use the filteredBlogData as the updated blogData state
        if (filteredBlogData.length > 0) {
          setIsDataFetched(true);
        }
        setFilteredData(filteredBlogData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogData();
  }, []);

  useEffect(() => {
    getBookMarkData();
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
      {filteredData.length ? (
        <div className={styles["blogs-container"]}>
          {filteredData.map((el, index) => (
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
          No BookMarked Data Found
        </div>
      )}
    </>
  );
};

export default BookMark;
