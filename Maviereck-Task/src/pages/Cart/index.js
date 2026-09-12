import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useShoppingContext } from '../../context/ShoppingContext';

function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useShoppingContext();
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const total = getCartTotal();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="add-to-cart-button"
            onClick={() => navigate('/shop-by-category')}
            style={{ marginTop: '1rem' }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button 
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    style={{ width: '50px', textAlign: 'center', border: '1px solid #ddd', padding: '5px' }}
                  />
                  <button 
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div style={{ fontWeight: '600', minWidth: '100px', textAlign: 'center' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="remove-button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="summary-value">${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span className="summary-value">${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="summary-value">${total > 0 ? '10.00' : '0.00'}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span className="summary-value">${(total + (total * 0.1) + (total > 0 ? 10 : 0)).toFixed(2)}</span>
            </div>

            <button 
              className="checkout-button"
              onClick={() => navigate('/checkout')}
              style={{ marginTop: '1.5rem' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;