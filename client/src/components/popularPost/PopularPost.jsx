import "./popularPost.css";
import { Link } from "react-router-dom";

function PopularPost({popularPost}) {


  return (
    <Link className="link popularPost-link" to={"/posts/" + popularPost._id}>
      <div className="popularPost">
        <img
          className="popularPost-img"
          src={popularPost.photo}
          alt=""
        />

        <div className="popularPost-desc">
          <h2 className="popularPost-title">{popularPost.title}</h2>
          <span className="popularPost-cat">
              {popularPost.categories}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PopularPost;
