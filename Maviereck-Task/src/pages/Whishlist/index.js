import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Whishlist.css';
import { useShoppingContext } from '../../context/ShoppingContext';

function Whishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useShoppingContext();
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleViewDetails = (productId) => {
    navigate(`/details/${productId}`);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Here you can find all the products you have added to your wishlist.</p>
        <p>Total items in wishlist: <span className="wishlist-count">{wishlist.length}</span></p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">♥</div>
          <p>Your wishlist is empty</p>
          <p>Start adding items to your wishlist to save them for later!</p>
          <a href="/shop-by-category" className="continue-shopping-btn">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="wishlist-items">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                
                <div className="wishlist-item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <p className={`item-availability ${item.inStock === false ? 'out-of-stock' : ''}`}>
                    {item.inStock === false ? 'Out of Stock' : 'In Stock'}
                  </p>
                </div>

                <div className="wishlist-item-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleViewDetails(item.id)}
                    style={{ backgroundColor: '#95a5a6' }}
                  >
                    View Details
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="wishlist-summary">
            <div className="summary-info">
              <strong>{wishlist.length}</strong> item(s) in your wishlist
            </div>
            <a href="/shop-by-category" className="continue-shopping-btn">Continue Shopping</a>
          </div>
        </>
      )}
    </div>
  );
}

export default Whishlist;
