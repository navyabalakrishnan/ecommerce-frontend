import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactStars from 'react-rating-stars-component';

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviewSection, setShowReviewSection] = useState(false);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/${id}`);
        setProduct(productResponse.data);
        const reviewsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product and reviews:", error);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return console.error("Authentication token not found");

      const requestBody = { product: product._id, quantity };
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/cart/addtocart`, requestBody, { withCredentials: true });

      if (res.status === 200 || res.status === 201) setMessage("Product added to cart successfully");
      else console.log("Failed to add product to cart", res.data);
    } catch (err) {
      console.error("Error adding product to cart:", err.response ? err.response.data : err.message);
    }
  };

  const addReview = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return console.error("Authentication token not found");

      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/reviews/create`, {
        productId: product._id,
        rating,
        comment,
      }, { withCredentials: true });

      setMessage("Review submitted successfully");
      setRating(0);
      setComment("");
      setShowReviewSection(false);

      const reviewsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/reviews/${id}`);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Error submitting review:', error.response ? error.response.data : error.message);
    }
  };

  const toggleReviewSection = () => setShowReviewSection(!showReviewSection);

  return (
    <div className='mt-40 m-48 mx-4 md:mx-12 lg:mx-24 flex flex-col lg:flex-row items-start'>
      <div className='flex-shrink-0 w-full lg:w-1/2 h-64 lg:h-96 overflow-hidden'>
        <img src={product.image} alt={product.name} className="object-cover h-full w-full rounded-lg" />
      </div>
      <div className='mt-8 lg:mt-0 lg:ml-12 w-full lg:w-1/2'>
        <div className='font-playfair font-bold text-3xl lg:text-5xl text-sky-800 text-center lg:text-left'>
          <h2>{product.productName}</h2>
        </div>
        <div className="flex justify-center lg:justify-end my-4">
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-purple-900">
            <span className="text-4xl lg:text-6xl text-teal-700">Rs </span>
            <span className="bg-gradient-to-r from-sky-800 via-sky-900 to-sky-950 text-transparent bg-clip-text">
              {product.price}
            </span>
          </h2>
        </div>

        <div className='mt-4 p-4 md:p-6 bg-white shadow-inner hover:shadow-md shadow-teal-900 rounded-lg'>
          <div className='font-playfair text-sky-700'>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='mt-6'>
          <div className='flex flex-col sm:flex-row items-center sm:space-x-4'>
            <div className='flex items-center space-x-4'>
              <button className='bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif' onClick={handleDecrease}>-</button>
              <span className='text-xl'>{quantity}</span>
              <button className='bg-sky-800 hover:bg-teal-950 text-white font-bold py-2 px-4 rounded-full font-serif' onClick={handleIncrease}>+</button>
            </div>
            <button onClick={addToCart} className='mt-4 sm:mt-0 text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-8 py-2 font-bold'>
              Add to cart
            </button>
          </div>
          {message && <div className='mt-4 text-green-900 font-playfair font-semibold text-center'>{message}</div>}
        </div>
        <div className='mt-4 text-center'>
          <Link to="/checkout">
            <button onClick={addToCart} className='text-white  font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-8 py-2 font-bold'>
              Buy Now
            </button>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="font-playfair text-xl lg:text-2xl text-sky-800">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-center">No reviews yet.</p>
          ) : (
            <div className="mt-4">
              {reviews.map((review) => (
                <div key={review._id} className="p-4 bg-gray-100 border border-gray-300 rounded-md mb-4">
                  <div className="flex items-center space-x-2">
                    <ReactStars
                      count={5}
                      size={20}
                      value={review.rating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <span className="font-semibold">{review.user.name}</span>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8">
          <button
            className="text-white font-playfair text-lg bg-sky-800 hover:bg-sky-950 rounded-md px-8 py-2 font-bold"
            onClick={toggleReviewSection}
          >
            Write a Review
          </button>

          {showReviewSection && (
            <div className="mt-4 p-4 md:p-6 bg-white shadow-inner hover:shadow-md shadow-teal-900 rounded-lg">
              <h3 className="font-playfair font-bold text-xl text-sky-800">Write a Review</h3>
              <div className="flex flex-col space-y-2 my-2">
                <div className="flex items-center space-x-2">
                  <ReactStars
                    count={5}
                    size={30}
                    value={rating}
                    onChange={setRating}
                    activeColor="#ffd700"
                  />
                </div>
                <textarea
                  className="w-full h-24 p-2 border border-sky-800 rounded-md resize-none"
                  placeholder="Share your thoughts about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                className="bg-sky-800 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded-full"
                onClick={addReview}
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
