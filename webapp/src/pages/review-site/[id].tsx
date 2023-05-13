import React, { useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';

interface StarProps {
  selected: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => (
  <div
    className={`mx-1 text-2xl cursor-pointer ${selected ? 'text-yellow-500' : 'text-gray-300'}`}
    onClick={onClick}
  >
    ★
  </div>
);

interface StarRatingProps {
  totalStars: number;
  selectedStars: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, selectedStars, onRate }) => (
  <div className="flex justify-center">
    {[...Array(totalStars)].map((n, i) => (
      <Star
        key={i}
        selected={i < selectedStars}
        onClick={() => onRate(i + 1)}
      />
    ))}
  </div>
);

const ReviewSite: React.FC = () => {
  const router = useRouter();
  const { taskID, userId } = router.query;
  const [rating, setRating] = useState(0);

  const submitReview = async () => {

    const response = await fetch('/api/submit-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, taskID, userId }),
    });
    console.log(response.json());
    console.log(`Submitted rating of ${rating} for id ${userId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4">Thank you for providing a review!</h1>
      <StarRating
        totalStars={5}
        selectedStars={rating}
        onRate={setRating}
      />
      <p className="text-gray-400 mt-2">Your feedback is anonymous</p>
      <button
        className={`mt-4 px-4 py-2 text-white rounded ${rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
        onClick={submitReview}
        disabled={rating === 0}
      >
        Submit Review
      </button>
      <div className="mt-10 p-4 w-64 text-center border-2 border-gray-300">
        <p>Have a problem?</p>
        <a href="mailto:example@amsterdam.nl" className="text-blue-500 hover:underline">Contact the City of Amsterdam</a>
      </div>
    </div>
  );
};

export default ReviewSite;