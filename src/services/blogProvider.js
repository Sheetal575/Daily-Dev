"use client";
import { useState } from "react";
import BlogDataContext from "./blogContext";
import { BlogService } from "./blogs";

export default function BlogDataProvider({ children }) {
  const [blogData, setBlogData] = useState(BlogService);

  return (
    <BlogDataContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogDataContext.Provider>
  );
}
