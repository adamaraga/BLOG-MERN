import "./topCategories.css";
import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

function TopCategories({categories}) {
  const { pathname } = useLocation();

  return (
    <div className="topCategories">
      
      <div className="categoriesCon">
        <Link className= {pathname === '/' ? "categories blueBorder link" : "categories link"} to="/">
          <div className=" ">Home</div>
        </Link>
        <Link className= {pathname === '/categories/sport' ? "categories blueBorder link" : "categories link"} to="/categories/sport">
          <div className=" ">Sport</div>
        </Link>
        <Link className= {pathname === '/categories/tech' ? "categories blueBorder link" : "categories link"} to="/categories/tech">
          <div className=" ">Tech</div>
        </Link>
        <Link className= {pathname === '/categories/travels' ? "categories blueBorder link" : "categories link"} to="/categories/travels">
          <div className=" ">Travels</div>
        </Link>
        <Link className= {pathname === '/categories/music' ? "categories blueBorder link" : "categories link"} to="/categories/music">
          <div className=" ">Music</div>
        </Link>
        <Link className= {pathname === '/categories/cinema' ? "categories blueBorder link" : "categories link"} to="/categories/cinema">
          <div className=" ">Cinema</div>
        </Link>
        <Link className= {pathname === '/categories/fashion' ? "categories blueBorder link" : "categories link"} to="/categories/fashion">
          <div className=" ">Fashion</div>
        </Link>
        {/* {categories.map((cat) => {
          return (
          
            <Link
            key={cat._id}
              className={
                pathname === `/categories/${cat.name}`
                  ? "categories blueBorder link"
                  : "categories link"
              }
              to={`/categories/${cat.name}`}
            >
              <div className=" ">{cat.name}</div>
            </Link>
         
          )
        })} */}

      </div>
     
      <div className="search">
        <input type="text" className="searchInput" />
        <i className="searchIcon fas fa-search"></i>
      </div>
    </div>
  );
}

export default TopCategories;
