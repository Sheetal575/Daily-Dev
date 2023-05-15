"use client";

import Blogs from "../blogs/blogs-container";
import { useState } from "react";
export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }
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
      <Blogs searchQuery={searchQuery} />
    </>
  );
};
