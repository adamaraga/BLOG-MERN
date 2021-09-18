import "./footer.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../../image/logo.svg'

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer-logo-con">
            <img className="logoImg" src={logo} alt="" />
          </div>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Categories</h3>
          <ul>
            {/* {categories &&
              categories.map((cat) => {
                return (
                  <li key={cat._id}>
                    <Link
                      to={`/categories/${cat.name}`}
                      className="footer__link"
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })} */}
            <li>
              <Link to="/categories/sport" className="footer__link">
                Sport
              </Link>
            </li>
            <li>
              <Link to="/categories/tech" className="footer__link">
                Tech
              </Link>
            </li>
            <li>
              <Link to="/categories/travels" className="footer__link">
                Travels
              </Link>
            </li>
            <li>
              <Link to="/categories/music" className="footer__link">
                Music
              </Link>
            </li>
            <li>
              <Link to="/categories/cinema" className="footer__link">
                Cinema
              </Link>
            </li>
            <li>
              <Link to="/categories/fashion" className="footer__link">
                Fashion
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Information</h3>
          <ul>
            <li>
              <Link to="/" className="footer__link">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                Terms of services
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">Follow us</h3>
          <div className="footer-social">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </div>
        </div>
      </div>

      <p className="footer__copy">&#169; 2021 Adam A. All right reserved</p>
    </footer>
  );
}

export default Footer;
