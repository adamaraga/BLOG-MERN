import "./register.css";
import { Link, useHistory } from "react-router-dom";
import img from "../../image/search.svg";
import img2 from "../../image/article.svg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import logo from "../../image/logo.svg";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import { store } from 'react-notifications-component';

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { isFetching, dispatch } = useContext(Context);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: "REGISTER_START",
    });

    try {
      const res = await axios.post("./auth/register", {
        username,
        email,
        password,
      });

      dispatch({
        type: "REGISTER_SUCCESS",
      });

        store.addNotification({
        title: "success",
        message: "Your account has been created successfully. You can Login to get started!!!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

      setTimeout(() => {
        res.data && history.push("/login");
      }, 5000);

      
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", });

      setError(true);
      setTimeout(() => {
        setError(false);
      }, 8000);
    }
  };

  console.log(isFetching);

  return (
    <div className="register">
    <ReactNotification />
      <div className="registerImgCon">
        <img className="loginLogoImg" src={logo} alt="" />
        <h1>
          Connecting Info <br /> and People
        </h1>
        <img className="registerImg" src={img2} alt="" />
      </div>
      <div className="registerInfo">
        <Link className="link registerIconCon" to="/">
          <i class="fa fa-times registerIcon" aria-hidden="true"></i>{" "}
        </Link>
        <span className="registerTitle">Signup</span>

        <form className="registerForm" onSubmit={handleSubmit}>
          <span className="registerGoogleBtn">
            <img src={img} alt="" />
            Sign up with Google
          </span>
          <span className="registerOption">
            {" "}
            <div></div> or Sign up with email <div></div>
          </span>
          <input
            autoFocus
            className="registerInput"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="registerInput"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={isFetching ? "registerBtn disabled" : "registerBtn"}
            type="submit"
          >
            {isFetching ? "signup..." : "signup"}
          </button>
          <p>
            Already have an account?{" "}
            <Link className="link blueText" to="/login">
              Login
            </Link>
          </p>

          {error && (
            <span className="errorMessage">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              Something went wrong! username and email must be unique
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
