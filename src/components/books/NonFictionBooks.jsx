import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store";

const nonFictionBooks = [
  {
    id: 101,
    title: "Atomic Habits",
    author: "James Clear",
    price: 599,
    discountedPrice: 499,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    genre: "Self-Help",
    description: "Tiny Changes, Remarkable Results"
  },
  {
    id: 102,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 799,
    discountedPrice: 699,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    genre: "History",
    description: "A Brief History of Humankind"
  },
  {
    id: 103,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 399,
    discountedPrice: 299,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    genre: "Business",
    description: "The Classic Guide to Financial Success"
  },
  // Add more non-fiction books as needed
];

export default function NonFictionBooks() {
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Non-Fiction Books</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {nonFictionBooks.map((book) => (
            <div key={book.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c";
                  }}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                  <p className="mt-1 text-sm text-gray-500">{book.genre}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">₹{book.discountedPrice}</p>
                  <p className="text-sm line-through text-gray-500">₹{book.price}</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(book)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
