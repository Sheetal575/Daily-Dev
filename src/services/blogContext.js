import { createContext } from "react";

const BlogDataContext = createContext({
  blogData: [],
  setBlogData: () => {},
});

export default BlogDataContext;
