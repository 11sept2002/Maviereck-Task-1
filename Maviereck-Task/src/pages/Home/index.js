import React from 'react';
import './Home.css';
import laptop from '../../images/lap 1.jpg';
import BannerImage from '../../images/Banner.jpg';

const Banner = () => {
  return (
    <div className="banner">
      <img src={BannerImage} alt="Banner" />
    </div>
  );
};

const ShopByCategory = () => {
  return (
    <div className="shop-by-category">
      <h2 className="shop-by-category-title">Shop By Category</h2>
      <div className="category-grid">
        <div className="category-item" style={{ cursor: 'pointer' }} onClick={() => window.location.href='/shop-by-category'}>
          <img src={laptop} alt="Category" style={{ objectFit: 'contain' }}/>
          <p>Laptop Category</p>
        </div>
      </div>
    </div>
  );
};

// const Header = () => {
//   return (
//     <header className="header">
//       <ul>
//         <li><Link to="/home">Home</Link></li>
//         <li><Link to="/shop-by-category">Shop By Category</Link></li>
//         <li><Link to="/cart">Cart</Link></li>
//         <li><Link to="/wishlist">Wishlist</Link></li>
//         <li><Link to="/login">Login</Link></li>
//       </ul>
//     </header>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>&copy; 2024 My Website</p>
//       <p>All rights reserved.</p>
//       <p>Designed by Senthil</p>
//       <p>Contact: contact@mywebsite.com</p>
//     </footer>
//   );
// };

function Home() {
  return (
    <div>
      <Banner />
      <ShopByCategory />     
    </div>
  );
}

export default Home;