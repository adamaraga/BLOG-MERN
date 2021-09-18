import "./login.css";
import { Link, useHistory } from "react-router-dom";
import img from "../../image/search.svg";
import img2 from "../../image/article.svg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import logo from "../../image/logo.svg";

export default function Login() {
  const { dispatch, isFetching } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: "LOGIN_START",
    });

    try {
      const res = await axios.post("./auth/login", {
        email: email,
        password: password,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      res.data && history.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });

      setError(true);
      setTimeout(() => {
        setError(false);
      }, 8000);
    
    }
  };

  return (
    <div className="login">
      <div className="loginImgCon">
        <img className="loginLogoImg" src={logo} alt="" />
        <h1>
          Connecting Info <br /> and People
        </h1>
        <img className="loginImg" src={img2} alt="" />
      </div>
      <div className="loginInfo">
        <Link className="link loginIconCon" to="/">
          <i class="fa fa-times loginIcon" aria-hidden="true"></i>{" "}
        </Link>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <span className="loginGoogleBtn">
            <img src={img} alt="" />
            Login with Google
          </span>
          <span className="loginOption">
            {" "}
            <div></div> or Login with email <div></div>
          </span>
          <input
            autoFocus
            className="loginInput"
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={isFetching ? "loginBtn disabled" : "loginBtn"}
            type="submit"
          >
            {isFetching ? "login..." : "login"}
          </button>
          <p>
            Not registerd yet?{" "}
            <Link className="link blueText" to="/register">
              Signup
            </Link>
          </p>

          {error && (
            <span className="errorMessage">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              Invalid username or password{" "}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
