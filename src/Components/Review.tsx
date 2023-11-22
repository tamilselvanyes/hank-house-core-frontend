import React from 'react';

export interface ReviewProps {
    name: string;
    comment: string;
    rating: number;
  }

  const Review: React.FC<ReviewProps> = ({ name, comment, rating }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="mb-2">{comment}</p>
      <p className="text-sm">Rating: {rating}/5</p>
    </div>
  );
};

export default Review;