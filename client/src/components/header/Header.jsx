import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function Header() {
  const { pathname } = useLocation();
  const [currentHeaderPost, setCurrentHeaderPost] = useState({});

  useEffect(() => {
    const fetchHeaderPosts = async () => {
      const res = await axios.get("/posts/?header=true");
      if (pathname === "/") {
        setCurrentHeaderPost(res.data[Math.floor(Math.random() * 6)]);
      }
      if (pathname === "/categories/sport") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "sport")[0]
        );
      }
      if (pathname === "/categories/fashion") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "fashion")[0]
        );
      }
      if (pathname === "/categories/cinema") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "cinema")[0]
        );
      }
      if (pathname === "/categories/travels") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "travels")[0]
        );
      }
      if (pathname === "/categories/music") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "music")[0]
        );
      }
      if (pathname === "/categories/tech") {
        setCurrentHeaderPost(
          res.data.filter((post) => post.headerType === "tech")[0]
        );
      }
    };
    fetchHeaderPosts();
  }, [pathname]);

  const headerStyle = {
    background: `linear-gradient( transparent, black), url(${currentHeaderPost.photo}) no-repeat center`,
    backgroundSize: "cover",
  };

  return (
    <>
      {currentHeaderPost.photo ? (
        <div className="header">
          <img src={currentHeaderPost.photo} className="headerImg" alt="" />
          <div className="headerTitleCon">
            <div className="headerTitleWrapper">
              <h1 className="headerTitle">{currentHeaderPost.title}</h1>

              <p className="headerDesc">{currentHeaderPost.desc}</p>

              <div className="postCats">
                <div>
                  <span className="postCat">
                    <Link className="link" to={`/categories/${currentHeaderPost.categories}`}>
                      {currentHeaderPost.categories}
                    </Link>
                  </span>
                </div>
              </div>
              <br />

              <Link to={`/posts/${currentHeaderPost._id}`} className="link">
                <button className="btn">Read article</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='header'>
          <Skeleton height={500} width={`100%`} />
        </div>
      )}
    </>
  );
}
