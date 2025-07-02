import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Homepage from "./components/pages/Homepage";
import Footer from "./components/footer/Footer";
import Products from "./components/Product/Products";
import Signin from "./components/Login/Signin.jsx";
import Signup from "./components/Login/Signup.jsx"
import Addto from "./components/addtocart/Addto.jsx";
import AddBook from "./components/books/AddBook.jsx";
import Profile from "./components/Profile/Profile";
import FictionBooks from "./components/books/FictionBooks";
import NonFictionBooks from "./components/books/NonFictionBooks";
import AcademicBooks from "./components/books/AcademicBooks";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Addto />} />
            <Route path="/fiction" element={<FictionBooks />} />
            <Route path="/non-fiction" element={<NonFictionBooks />} />
            <Route path="/academic" element={<AcademicBooks />} />
            <Route path="/add-books" element={<AddBook />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
