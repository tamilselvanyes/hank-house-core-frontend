import React, { useEffect, useState } from 'react';
import { ReviewModel } from '../pages/Products/Model';
import { addNewReview } from '../utils/helpers';

interface AddReviewProps {
  productId: any;
}

const AddReview = (props: AddReviewProps) => {
  const [name, setName] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const handleAddReview = async () => {
    if (name !== '' && review !== '' && rating !== '') {
      const body: ReviewModel = {
        productId: props.productId,
        userName: name,
        review: review,
        stars: rating,
      };
      const addReview = await addNewReview(body);
      console.log('review added', addReview);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          First name
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          onChange={(e) => {
            setReview(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      <div className="flex">
        <div>
          <label
            htmlFor="number-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Rating:
          </label>
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2.5"
            min="0"
            max="5"
            required
            onChange={(e) => {
              setRating(e.currentTarget.value);
            }}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          handleAddReview();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddReview;
