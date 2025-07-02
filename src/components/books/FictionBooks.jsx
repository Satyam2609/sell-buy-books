import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store";

const fictionBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 499,
    discountedPrice: 399,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    genre: "Literary Fiction",
    description: "A novel about infinite possibilities and second chances"
  },
  {
    id: 2,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 599,
    discountedPrice: 499,
    image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd",
    genre: "Mystery & Thriller",
    description: "A psychological thriller that will keep you guessing"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 699,
    discountedPrice: 599,
    image: "https://images.unsplash.com/photo-1629196914168-3a2652305f1f",
    genre: "Science Fiction",
    description: "An interstellar adventure from the author of The Martian"
  },
  // Add more fiction books as needed
];

export default function FictionBooks() {
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Fiction Books</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {fictionBooks.map((book) => (
            <div key={book.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f";
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
