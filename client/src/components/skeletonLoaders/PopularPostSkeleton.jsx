import React from "react";
import Skeleton from "react-loading-skeleton";

function PopularPostSkeleton() {
  return (
    < >
      {Array(5)
        .fill()
        .map((index) => {
          return (
            <div className='popularPost' key={index}>
              <Skeleton height={`100%`} width={`100%`} />
            </div>
          );
        })}
    </>
  );
}

export default PopularPostSkeleton;
