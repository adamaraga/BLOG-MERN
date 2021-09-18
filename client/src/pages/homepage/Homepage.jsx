import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeSidebar from "../../components/homeSidebar/HomeSidebar";
import Posts from "../../components/posts/Posts";
import TopCategories from "../../components/topCategories/TopCategories";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PostSkeleton from "../../components/skeletonLoaders/PostSkeleton";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const { pathname, search } = useLocation();
  


  useEffect(() => {
    window.scroll(0, 0);

    const fetchPost = async () => {
      const res = await axios.get("/posts/"+ search);

      if (pathname === "/") {
        setPosts(res.data);
      }
      if (pathname === "/categories/sport") {
        setPosts(res.data.filter((post) => post.categories[0] === "sport"));
      }
      if (pathname === "/categories/fashion") {
        setPosts(res.data.filter((post) => post.categories[0] === "fashion"));
      }
      if (pathname === "/categories/cinema") {
        setPosts(res.data.filter((post) => post.categories[0] === "cinema"));
      }
      if (pathname === "/categories/travels") {
        setPosts(res.data.filter((post) => post.categories[0] === "travels"));
      }
      if (pathname === "/categories/music") {
        setPosts(res.data.filter((post) => post.categories[0] === "music"));
      }
      if (pathname === "/categories/tech") {
        setPosts(res.data.filter((post) => post.categories[0] === "tech"));
      }
    };
    fetchPost();
  }, [pathname, search]);

  return (
    <>
      <TopCategories />
      <Header />
      <div className="home">
        { posts.length >= 1 ? <Posts posts={posts} /> : <PostSkeleton /> }
        <HomeSidebar />
      </div>
      <Footer />
    </>
  );
}
