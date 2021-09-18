import "./homeSidebar.css";
import PopularPost from "../popularPost/PopularPost";
import { useEffect, useState } from "react";
import axios from "axios";
import PopularPostSkeleton from "../skeletonLoaders/PopularPostSkeleton";

function HomeSidebar() {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/?popular=true");
      setPopularPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="homeSidebar">
      <h1>Popular </h1>

      {popularPosts.length >= 1 ? (
        popularPosts.map((popularPost) => {
          return (
            <PopularPost popularPost={popularPost} key={popularPost._id} />
          );
        })
      ) : (
        <PopularPostSkeleton />
      )}
    </div>
  );
}

export default HomeSidebar;
