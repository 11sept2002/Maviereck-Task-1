import React, { useState } from 'react';
import './Checkout.css';
import { useShoppingContext } from '../../context/ShoppingContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder } = useShoppingContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + tax + shipping;
    
    // Create order object
    const orderData = {
      shippingInfo: formData,
      items: cart,
      subtotal,
      tax,
      shipping,
      total,
    };
    
    // Save order to localStorage
    addOrder(orderData);
    
    console.log('Order submitted:', orderData);
    clearCart();
    alert('order placed successfully!');
    window.location.href = '/home';
    navigate('/home');
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    id="zipCode"
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            

            <button type="submit" className="place-order-button">Place Order</button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-items">
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#7f8c8d' }}>No items in cart</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-name">{item.name} (x{item.quantity})</span>
                  <span className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span className="value">${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (10%):</span>
            <span className="value">${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span className="value">${shipping.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span className="label">Total:</span>
            <span className="value">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;