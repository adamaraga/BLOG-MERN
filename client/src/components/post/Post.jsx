import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <img className="postImg" src={post.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          <div>
            {post.categories.map((cat) => {
              return (
                <span className="postCat">
                  <Link className="link" to={`/categories/${cat}`}>
                    {cat}
                  </Link>
                </span>
              );
            })}

            {/* <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                Life
              </Link>
            </span> */}
          </div>

          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <span className="postTitle">{post.title}</span>
      </div>
      <p className="postDesc">{post.desc}</p>

      <Link to={`/posts/${post._id}`} className="link">
        <button className="btnSec">Read article</button>
      </Link>
    </div>
  );
}
