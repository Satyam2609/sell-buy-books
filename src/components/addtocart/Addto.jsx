import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Store";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalPrice = () => {
    // Calculate the total price logic here based on cartItems
  };

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + Number(item.discountedPrice), 0);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Validate all required fields
    if (!userDetails.fullName || !userDetails.phoneNumber || !userDetails.email || 
        !userDetails.address || !userDetails.city || !userDetails.state || !userDetails.pincode) {
      alert('Please fill in all delivery details');
      return;
    }
    // Show payment methods after address is submitted
    setShowPaymentMethods(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    
    // Show order confirmation with details
    const orderDetails = {
      items: cartItems,
      userDetails: userDetails,
      paymentMethod: selectedPayment,
      totalAmount: calculateTotalCost()
    };

    const confirmOrder = window.confirm(
      `Please confirm your order details:\n\n` +
      `Delivery Address:\n` +
      `${userDetails.fullName}\n` +
      `${userDetails.address}\n` +
      `${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}\n` +
      `Phone: ${userDetails.phoneNumber}\n` +
      `Email: ${userDetails.email}\n\n` +
      `Payment Method: ${selectedPayment.toUpperCase()}\n` +
      `Total Amount: ₹${calculateTotalCost()}\n\n` +
      `Click OK to confirm and place order`
    );

    if (confirmOrder) {
      // Save order to localStorage for persistence
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        ...orderDetails,
        orderId: Date.now(),
        orderDate: new Date().toISOString()
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      // Handle order completion
      console.log('Order placed:', orderDetails);
      setShowOrderForm(false);
      setShowPaymentMethods(false);
      alert('Order placed successfully!');
      // Clear cart
      dispatch(clearCart());
      // Redirect to home
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="text-md font-semibold text-gray-600">
        <div className="flex justify-between border-b border-gray-200 pb-2 mb-4">
        <div className="hidden md:block">Product Details</div>
        <div className="text-center ">Quantity</div>
        <div className="text-center">Price</div>
        <div className="text-center">Total</div>
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-4">
              <div className="flex items-center mb-2 md:mb-0">
                <img
                  className="h-20 w-20 object-cover rounded mr-4"
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      "https://rukminim1.flixcart.com/image/612/612/krme93k0/lehenga-choli/9/t/e/free-half-sleeve-ghaghra-choli-coconut-original-imag5df5ktsnnypv.jpeg?q=70";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-sm">{item.title}</span>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex   md:w-3/5 mt-2 md:mt-0">
              <button className="text-gray-600 mx-2 focus:outline-none">
              <svg
                className="fill-current w-6 cursor-pointer"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </button>
            <input
              className="mx-2 border text-center w-12"
              type="text"
              defaultValue="1"
            />
            <button className="text-gray-600 mx-2 focus:outline-none">
              <svg
                className="fill-current w-6 cursor-pointer"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </button>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm">Price: ₹{item.discountedPrice}</span>
              <span className="text-sm">Total: ₹{item.discountedPrice}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <Link
          to="/"
          className="text-indigo-600 text-sm flex items-center mb-4 md:mb-0"
        >
          <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </Link>

        <div
          id="summary"
          className="w-full md:w-1/4 px-4 py-8 mb-7 bg-gray-100 rounded-lg"
        >
          <h1 className="font-semibold text-2xl border-b pb-4">
            Order Summary
          </h1>
          <div className="flex flex-col space-y-4 mt-6 mb-4">
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Place Order
            </button>
          </div>

          {showOrderForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{showPaymentMethods ? 'Payment Method' : 'Delivery Details'}</h2>
                
                {!showPaymentMethods ? (
                  <form onSubmit={handleAddressSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={userDetails.fullName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={userDetails.phoneNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userDetails.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                          name="address"
                          value={userDetails.address}
                          onChange={handleInputChange}
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={userDetails.city}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">State</label>
                          <input
                            type="text"
                            name="state"
                            value={userDetails.state}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                        <input
                          type="text"
                          name="pincode"
                          value={userDetails.pincode}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowOrderForm(false)}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Select Payment Method</label>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="upi"
                              name="payment"
                              value="upi"
                              checked={selectedPayment === 'upi'}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="upi" className="ml-2 text-sm text-gray-700">UPI</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="card"
                              name="payment"
                              value="card"
                              checked={selectedPayment === 'card'}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="card" className="ml-2 text-sm text-gray-700">Credit/Debit Card</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="cod"
                              name="payment"
                              value="cod"
                              checked={selectedPayment === 'cod'}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="cod" className="ml-2 text-sm text-gray-700">Cash on Delivery</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowPaymentMethods(false)}
                        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-4 mt-6 mb-4">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span>₹{calculateTotalCost()}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-indigo-600 text-white text-center py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </Link>
            <span className="text-sm uppercase">Items {cartItems.length}</span>
            <span className="text-sm">${calculateTotalPrice()}</span>
          </div>
          <div>
            <label className="font-medium mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm border">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-6">
            <label
              htmlFor="promo"
              className="font-semibold mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full border"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-6 py-3 text-sm text-white uppercase w-full mb-4 rounded-md">
            Apply
          </button>
          <div className="border-t">
            <div className="flex font-semibold justify-between py-4 text-sm uppercase">
              <span>Total cost</span>
              <span>${calculateTotalCost()}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 px-6 py-3 text-sm text-white uppercase w-full rounded-md">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;