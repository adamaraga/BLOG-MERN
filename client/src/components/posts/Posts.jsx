import Post from "../post/Post";
import "./posts.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function Posts({posts}) {
  const [pageNumber, setPageNumber] = useState(0);

  const postPerPage = 6;
  const pagesVisited = pageNumber * postPerPage;

  const displayPosts = posts 
    .slice(pagesVisited, pagesVisited + postPerPage)
    .map((post) => {
      return (
        <div key={post._id}>
          <Post post={post} />
        </div>
      );
    });

  const pageCount = Math.ceil(posts.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="posts">
      {displayPosts}

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        
      />
     
    </div>
  );
}
