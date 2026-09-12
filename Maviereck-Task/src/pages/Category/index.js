import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import { PRODUCTS_DATABASE } from '../../data/productsData';
import { useShoppingContext } from '../../context/ShoppingContext';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useShoppingContext();

  const allProducts = PRODUCTS_DATABASE;
  const categories = ['acer', 'dell', 'hp'];

  const displayProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const handleProductClick = (product) => {
    navigate(`/details/${product.id}`);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
    alert(isInWishlist(product.id) ? `${product.name} removed from wishlist!` : `${product.name} added to wishlist!`);
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Shop by Category</h1>
        <p>Explore our wide range of laptops</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="acer">Acer</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
          </select>
        </div>       
      </div>

      {/* Products Grid */}
      {selectedCategory === 'all' ? (
        <>
          {categories.map((categoryName) => {
            const categoryProducts = allProducts.filter(p => p.category === categoryName);
            return (
              <div key={categoryName} className="category-section">
                <h2 className="category-name">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
                <div className="products-grid">
                  {categoryProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="product-card"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-image-wrapper">
                        <img src={product.image} alt={product.name} className="product-card-image" />
                        <span className="product-badge">New</span>
                      </div>

                      <div className="product-card-info">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-description">{product.description}</p>

                        <div className="product-rating">
                          <span className="stars">{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
                          <span className="rating-count">({product.reviews} reviews)</span>
                        </div>

                        <div className="product-card-price">
                          ${product.price.toFixed(2)}
                        </div>

                        <div className="product-card-actions">
                          <button 
                            className="add-to-cart-card-btn"
                            onClick={(e) => handleBuyNow(e, product)}
                          >
                            Buy Now
                          </button>
                          <button 
                            className="wishlist-card-btn"
                            onClick={(e) => handleWishlist(e, product)}
                            style={{
                              backgroundColor: isInWishlist(product.id) ? '#e74c3c' : '#e0e0e0',
                              color: isInWishlist(product.id) ? '#fff' : '#e74c3c'
                            }}
                          >
                            ♥
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="category-section">
          <h2 className="category-name">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
          <div className="products-grid">
            {displayProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-card-image" />
                  <span className="product-badge">New</span>
                </div>

                <div className="product-card-info">
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-description">{product.description}</p>

                  <div className="product-rating">
                    <span className="stars">{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
                    <span className="rating-count">({product.reviews} reviews)</span>
                  </div>

                  <div className="product-card-price">
                    ${product.price.toFixed(2)}
                  </div>

                  <div className="product-card-actions">
                    <button 
                      className="add-to-cart-card-btn"
                      onClick={(e) => handleBuyNow(e, product)}
                    >
                      Buy Now
                    </button>
                    <button 
                      className="wishlist-card-btn"
                      onClick={(e) => handleWishlist(e, product)}
                      style={{
                        backgroundColor: isInWishlist(product.id) ? '#e74c3c' : '#e0e0e0',
                        color: isInWishlist(product.id) ? '#fff' : '#e74c3c'
                      }}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
