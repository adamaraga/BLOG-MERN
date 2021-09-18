import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ post }) {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={
            post.profilePic
              ? post.profilePic
              : "https://res.cloudinary.com/adamworkimages/image/upload/v1631283952/Blog%20images/blank-profile-picture-973460_1280_h8j5nq.png"
          }
          alt=""
        />
        <strong>Blogger | Developer</strong>
        <p>
          Hi, my name is {post.username} Brought days i the called green moving
          female seasons after one void blessed day replenish moving given midst
          fly two heaven under tree fly lesser evening sea had gathering fowl.
        </p>
      </div>
    </div>
  );
}
