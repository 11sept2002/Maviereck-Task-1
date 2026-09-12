import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';
import { getProductById } from '../../data/productsData';
import { useShoppingContext } from '../../context/ShoppingContext';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, addToWishlist, isInWishlist } = useShoppingContext();
  
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(product ? isInWishlist(product.id) : false);

  if (!product) {
    return (
      <div className="details-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/shop-by-category')} className="add-to-cart-button">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} (Qty: ${quantity}) added to cart!`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    addToWishlist(product);
    const newWishlistState = !inWishlist;
    setInWishlist(newWishlistState);
    alert(newWishlistState ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist!`);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="details-container">
      <div className="product-details">
        {/* Product Image */}
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <span className="rating-stars">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</span>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price">
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            ${product.price.toFixed(2)}
            <span className="discount-badge">-{discount}%</span>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          {/* Specifications */}
          <div className="product-specs">
            <div className="specs-title">Specifications</div>
            <div className="spec-item">
              <span className="spec-label">Processor:</span>
              <span className="spec-value">{product.specs.processor}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">RAM:</span>
              <span className="spec-value">{product.specs.ram}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Storage:</span>
              <span className="spec-value">{product.specs.storage}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Display:</span>
              <span className="spec-value">{product.specs.display}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Battery:</span>
              <span className="spec-value">{product.specs.battery}</span>
            </div>
          </div>

          {/* Availability */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: product.inStock ? '#27ae60' : '#e74c3c', fontWeight: '600' }}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <div className="quantity-selector">
              <button className="qty-button" onClick={decreaseQuantity}>−</button>
              <input type="number" className="qty-input" value={quantity} readOnly />
              <button className="qty-button" onClick={increaseQuantity}>+</button>
            </div>
            <button 
              className="add-to-cart-button" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              className="wishlist-button" 
              onClick={handleWishlist}
              style={{ 
                color: inWishlist ? '#fff' : '#e74c3c', 
                backgroundColor: inWishlist ? '#e74c3c' : '#e0e0e0' 
              }}
            >
              ♥ {inWishlist ? 'In Wishlist' : 'Add Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>
        <div className="review-item">
          <div className="review-author">John Doe</div>
          <div className="review-rating">★★★★★ 5 stars</div>
          <div className="review-text">
            Excellent laptop! Very fast and reliable. Great value for money.
          </div>
        </div>
        <div className="review-item">
          <div className="review-author">Jane Smith</div>
          <div className="review-rating">★★★★☆ 4 stars</div>
          <div className="review-text">
            Good quality laptop. Battery life could be better, but overall satisfied.
          </div>
        </div>
        <div className="review-item">
          <div className="review-author">Mike Johnson</div>
          <div className="review-rating">★★★★★ 5 stars</div>
          <div className="review-text">
            Perfect for my work. Fast performance and beautiful display.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;