import Rating from "react-rating";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {

    return (
      <Rating
        initialRating={rating}
        readonly
        emptySymbol={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="icon"
            style={{ width: "24px", height: "24px", color: "grey" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.051 6.287a1 1 0 00.95.69h6.613c.97 0 1.371 1.24.588 1.81l-5.354 3.89a1 1 0 00-.364 1.118l2.051 6.287c.3.921-.755 1.688-1.538 1.118l-5.354-3.89a1 1 0 00-1.176 0l-5.354 3.89c-.783.57-1.838-.197-1.538-1.118l2.051-6.287a1 1 0 00-.364-1.118l-5.354-3.89c-.783-.57-.383-1.81.588-1.81h6.613a1 1 0 00.95-.69l2.051-6.287z"
            />
          </svg>
        }
        fullSymbol={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="orange"
            viewBox="0 0 24 24"
            className="icon"
            style={{ width: "24px", height: "24px", color: "orange" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.051 6.287a1 1 0 00.95.69h6.613c.97 0 1.371 1.24.588 1.81l-5.354 3.89a1 1 0 00-.364 1.118l2.051 6.287c.3.921-.755 1.688-1.538 1.118l-5.354-3.89a1 1 0 00-1.176 0l-5.354 3.89c-.783.57-1.838-.197-1.538-1.118l2.051-6.287a1 1 0 00-.364-1.118l-5.354-3.89c-.783-.57-.383-1.81.588-1.81h6.613a1 1 0 00.95-.69l2.051-6.287z"
            />
          </svg>
        }
      />
    );
}

export default StarRating;
