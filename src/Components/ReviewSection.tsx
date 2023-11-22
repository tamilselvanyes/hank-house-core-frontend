import React from 'react';
import Review from './Review';

const reviewsData = [
  { name: 'John Doe', comment: 'Great product!', rating: 5 },
  { name: 'Jane Smith', comment: 'Very satisfied with my purchase.', rating: 4 },
  // Add more review data as needed
];

const ReviewSection = () => {
  return (
    <div className="review-section mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviewsData.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewSection;