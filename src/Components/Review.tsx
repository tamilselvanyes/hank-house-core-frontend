import React from 'react';
import ReactStars from 'react-stars';
export interface ReviewProps {
  name: string;
  comment: string;
  rating: string;
}

const Review: React.FC<ReviewProps> = ({ name, comment, rating }) => {
  return (
    <div className="border p-4 mb-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2 italic">{name}</h3>
      <p className="mb-2 font-light">"{comment}"</p>
      {/* <p className="text-sm">Rating: {rating}/5</p> */}
      <ReactStars
        count={5}
        // onChange={ratingChanged}
        value={parseInt(rating)}
        edit={false}
        size={24}
        color2="#ffd700"
      />
    </div>
  );
};

export default Review;
