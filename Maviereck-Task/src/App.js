import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ShoppingProvider } from './context/ShoppingContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Login from './pages/User/Login';
import Whishlist from './pages/Whishlist';
import Category from './pages/Category'; 
import Header from './pages/Home/header';
import Footer from './pages/Home/footer';
import Orders from './pages/Orders';
  
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


function App() {
  return (
    <ShoppingProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/whishlist" element={<Whishlist />} />
            <Route path="/shop-by-category" element={<Category />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          {scrollToTop()}
          <Footer />
        </Router>
      </div>
    </ShoppingProvider>
  );
}

export default App;
