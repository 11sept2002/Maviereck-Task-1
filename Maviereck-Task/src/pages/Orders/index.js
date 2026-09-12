import React from "react";
import { useShoppingContext } from "../../context/ShoppingContext";
import "./Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const { getOrders } = useShoppingContext();
  const orders = getOrders();
  const [expandedOrders, setExpandedOrders] = React.useState({});


  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage all your purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <p>No orders yet</p>
          <p className="empty-subtitle">
            Start shopping to see your orders here
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{formatDate(order.timestamp)}</p>
                </div>
                <button 
                  className="order-toggle-btn"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  {expandedOrders[order.id] ? (
                    <>
                      Hide details <FontAwesomeIcon icon={faChevronUp} />
                    </>
                  ) : (
                    <>
                      Show details <FontAwesomeIcon icon={faChevronDown} />
                    </>
                  )}
                </button>
                <div className="order-total">
                  <span className="total-label">Total</span>
                  <span className="total-amount">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={`order-details ${expandedOrders[order.id] ? "expanded" : ""}`}>
                <div className="order-shipping">
                  <h4>Shipping To</h4>
                  <p>
                    {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                  </p>
                  <p>{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                    {order.shippingInfo.zipCode}
                  </p>
                </div>

                <div className="order-items-section">
                  <h4>Items ({order.items.length})</h4>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image"
                        />
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-qty">Qty: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%):</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
