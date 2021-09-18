import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import Sidebar from "../sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import DeleteWarning from "../deleteWarning/DeleteWarning";
import Skeleton from "react-loading-skeleton";
import { store } from "react-notifications-component";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();

    window.scroll(0, 0);
  }, [path]);

  const handelShowEdit = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await axios.put("/posts/" + path, {
        username: post.username,
        title,
        desc,
      });
      setLoading(false);
      store.addNotification({
        title: "success",
        message: "Your post has been updated successfully!!!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

      setEditMode(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete("/posts/" + path, {
        data: {
          username: post.username,
        },
      });
      setLoading(false);
      store.addNotification({
        title: "success",
        message: "Your post has been deleted successfully!!!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteWarning = () => {
    setShowDeleteWarning(true);

    setTimeout(() => {
      setShowDeleteWarning(false);
    }, 10000);
  };

  return (
    <div className="singlePost">
      <div className="singlePostSocial">
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram-square"></i>
        <i className="fab fa-pinterest-square"></i>
        <i className="fab fa-twitter-square"></i>
      </div>
      <DeleteWarning
        title="Delete Post"
        desc="this post"
        show={showDeleteWarning}
        handleDelete={handleDelete}
        setShowDeleteWarning={() => setShowDeleteWarning(false)}
        loading={loading}
      />
      <div className="singlePostWrapper">
        {post.photo ? (
          <div className="singlePostHeader">
            <img src={post.photo} alt="" className="singlePostHeaderImg" />
            <div className="singlePostInfoCon">
              <h1 className="singlePostTitle">
                {/* {post.title} */}
                {editMode ? (
                  <input
                    className="singlePostTitleInput"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    value={title}
                  />
                ) : (
                  title
                )}
                {post.username === user?.username && (
                  <div className="singlePostEdit">
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={handelShowEdit}
                    ></i>
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={deleteWarning}
                    ></i>
                  </div>
                )}
              </h1>
              <div className="singlePostInfo">
                <div className="singlePostAuthur">
                  <img
                    src={
                      post.profilePic
                        ? post.profilePic
                        : "https://res.cloudinary.com/adamworkimages/image/upload/v1631283952/Blog%20images/blank-profile-picture-973460_1280_h8j5nq.png"
                    }
                    alt=""
                  />
                  <Link className="link" to={`/?user=${post.username}`}>
                    {post.username}
                  </Link>
                </div>
                <div className="singlePostDate">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className="singlePostTag">
                  <i className="fa fa-tags" aria-hidden="true"></i>
                  {post.categories}
                </div>
                <div className="singlePostComment">
                  <i className="fa fa-comments" aria-hidden="true"></i>
                  <span> 0 comment </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Skeleton height={450} width={`100%`} />
          </div>
        )}

        <div className="singlePostDescCon">
          {post.desc ? (
            <p className="singlePostDesc">
              {" "}
              {editMode ? (
                <div>
                  <textarea
                    className="singlePostDescInput"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  ></textarea>
                </div>
              ) : (
                desc
              )}
            </p>
          ) : (
            <p className="singlePostDesc">
              <Skeleton count={50} />
            </p>
          )}

          <Sidebar post={post} />
        </div>
        {editMode && (
          <button
            onClick={handleEdit}
            className="btn"
            style={{ alignSelf: "center" }}
          >
            {loading ? "Updating..." : "Update"}{" "}
          </button>
        )}
      </div>
    </div>
  );
}
