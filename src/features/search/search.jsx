import Blogs from "../blogs/blogs-container";

export const Search = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "400px" }}>
          <input placeholder="Search here by type of post" />
        </div>
      </div>
      <br />
      <br />
      <Blogs />
    </>
  );
};
