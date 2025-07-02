import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, addNewArrival } from '../Store';

const AddBook = () => {
  const dispatch = useDispatch();
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: null,
    condition: 'new',
    category: ''
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [addedBooks, setAddedBooks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setBookDetails(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate discounted price (20% off)
    const originalPrice = bookDetails.price;
    const discountedPrice = Math.round(Number(originalPrice) * 0.8).toString();

    // Create book object matching the Products format exactly
    const newBook = {
      id: Date.now(),
      image: imagePreview,
      brand: bookDetails.author,
      title: bookDetails.title,
      color: '',
      discountedPrice: discountedPrice,
      price: originalPrice,
      discount: '20% off',
      description: bookDetails.description,
      condition: bookDetails.condition,
      category: bookDetails.category
    };

    // Add to local cart display
    setAddedBooks(prev => [...prev, newBook]);

    // Add to cart and new arrivals
    dispatch(addToCart(newBook));
    dispatch(addNewArrival(newBook));

    // Reset form
    setBookDetails({
      title: '',
      author: '',
      price: '',
      description: '',
      image: null,
      condition: 'new',
      category: ''
    });
    setImagePreview(null);
  };

  const removeBook = (bookId) => {
    setAddedBooks(prev => prev.filter(book => book.id !== bookId));
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Add Your Book Details</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={bookDetails.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={bookDetails.author}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={bookDetails.price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={bookDetails.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="academic">Academic</option>
                  <option value="children">Children's Books</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Condition
                </label>
                <select
                  name="condition"
                  value={bookDetails.condition}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Book preview"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={bookDetails.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-700 rounded-md font-semibold font-sans hover:bg-indigo-500 shadow-md text-white px-6 py-2"
              >
                Add to Exchange List
              </button>
            </div>
          </form>
        </div>

        {/* Cart-like Display Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Exchange Books</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:gap-8">
            {addedBooks.map((book) => (
              <div
                key={book.id}
                className="group relative border-2 overflow-hidden shadow-md shadow-slate-200"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="object-cover object-center w-full h-[368px]"
                  />
                </div>
                <div className="mt-4 ml-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-md font-semibold text-gray-500">
                      {book.brand}
                      <br />
                      <a href="#" className="text-gray-900">
                        {book.title}
                      </a>
                    </h3>
                    <div className="flex items gap-4 mt-2">
                      <h4 className="text-md text-gray-900 font-semibold">
                        ₹{book.discountedPrice}
                      </h4>
                      <h4 className="text-md text-gray-500 line-through">
                        ₹{book.price}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Condition: {book.condition}
                    </p>
                  </div>
                  <button
                    onClick={() => removeBook(book.id)}
                    className="text-red-500 hover:text-red-700 mt-4 mb-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {addedBooks.length > 0 && (
            <div className="mt-6 p-4 bg-white shadow rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Books:</span>
                <span>{addedBooks.length}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">Total Value:</span>
                <span>₹{addedBooks.reduce((sum, book) => sum + Number(book.discountedPrice), 0)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBook;
