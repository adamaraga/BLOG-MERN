import React from "react";
import Skeleton from "react-loading-skeleton";

function PostSkeleton() {
 

  return (
    <div className="posts">
      
      {Array(6)
        .fill()
        .map((index) => {
          return (
            <div className="post" key={index}>
              <Skeleton height={250} width={`100%`} />
              <div className="postInfo">
                <Skeleton height={38} width={`100%`} />
              </div>
              <p className="postDesc">
                <Skeleton count={2} />
              </p>
              <Skeleton height={50} width={`50%`} />
            </div>
          );
        })}
    </div>
  );
}

export default PostSkeleton;
