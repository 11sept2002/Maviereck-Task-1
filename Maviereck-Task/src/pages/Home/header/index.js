import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';
import { useShoppingContext } from '../../../context/ShoppingContext';

const Header = () => {
  const { getCartCount } = useShoppingContext();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/shop-by-category">Shop By Category</Link></li>
        <li style={{ position: 'relative' }}>
          <Link to="/cart">
            Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/whishlist">Wishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </header>
  );
};
export default Header;