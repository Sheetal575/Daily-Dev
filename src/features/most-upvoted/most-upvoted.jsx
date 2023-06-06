"use client";
import { useState, useEffect } from "react";
import styles from "../blogs/blogs.module.scss";
import classes from "./most-upvoted.module.scss";
import BlogsCard from "../blogs/blogs-cards";
import { get } from "../../services/requests";
import { Modal } from "../../components/modal/modal";
import { CircularProgress } from "@mui/material";

const Data = ["2", "5", "10", "15", "20", "25", "50"];
const MostUpvoted = () => {
  const [blogData, setBlogData] = useState([]);
  const [minimumVotes, setMinimumVotes] = useState(2);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
    const filteredBlogs = blogData.filter(
      (blog) => blog.upVote >= minimumVotes
    );

    if (filteredBlogs.length > 0) {
      setIsDataFetched(true);
    }
    setFilteredData(filteredBlogs);
  }, [blogData, minimumVotes]);

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
      <div className={classes["most-upvoted"]}>
        <div className={classes.prompt}>
          <span>Select minimum upvotes for maximum Impact</span>
          <button
            onClick={() => setIsOpenModal(!isOpenModal)}
            className={classes["customise-button"]}
          >
            Select
          </button>
        </div>
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
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(!isOpenModal)}>
        <div className={classes["tag-container"]}>
          {Data &&
            Data.map((el) => (
              <button
                className={`${classes.tags} ${
                  el == minimumVotes ? classes["tags-active"] : ""
                }`}
                onClick={() => setMinimumVotes(el)}
              >
                {el}
              </button>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default MostUpvoted;
