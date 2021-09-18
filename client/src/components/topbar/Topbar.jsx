import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import logo from "../../image/logo.svg";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const [shadow, setShadow] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  function handleShadow() {
    if (window.scrollY >= 20) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div className={shadow ? "top shadow" : "top"}>
      <div className="topLeft">
        <Link className="link" to="/">
          <img className="logoImg" src={logo} alt="" />
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              home
            </Link>
          </li>
          <li className="topListItem">about</li>
          <li className="topListItem">contact</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              write
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <div className="topUser">
            <img
              className="topImg"
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://res.cloudinary.com/adamworkimages/image/upload/v1631283952/Blog%20images/blank-profile-picture-973460_1280_h8j5nq.png"
              }
              alt=""
            />
            <div className="topUserMenu">
              <Link className="link topUserItem" to="/settings">
                settings
              </Link>
              <span className="topUserItem" onClick={handleLogout}>
                logout
              </span>
            </div>
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/register">
                signup
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link topBarBtn" to="/login">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
