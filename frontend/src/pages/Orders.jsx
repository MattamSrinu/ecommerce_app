import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const BASE_URL = "http://localhost:8000";
export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("orders/me/");
    setOrders(res.data);
  };

  useEffect(() => {loadOrders();}, []);

  const deleteOrder = async (id) => {
    try {
      await api.delete(`orders/delete/${id}/`);
      alert("Order cancelled successfully!");
      loadOrders(); // refresh list
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel order");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="card p-4 mb-4 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <h5>Order #{order.id}</h5>
              <p>
                Status: <strong>{order.status}</strong>
                {order.status !== "Delivered" && (
                  <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteOrder(order.id)}>
                    Cancel Order
                  </button>
                )}
              </p>
              <p>
                Total Price: <strong>₹{order.total_price}</strong>
              </p>
              <h6 className="mt-3">Items:</h6>
              {order.items.map((item) => {
                const imageUrl = item.product.image.startsWith("/media")
                  ? BASE_URL + item.product.image
                  : item.product.image;
                return (
                  <div
                    key={item.id}
                    className="d-flex align-items-center mb-3 pb-3 border-bottom"
                  >
                    <img
                      src={imageUrl}
                      alt={item.product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        marginRight: "15px",
                      }}
                    />
                    <div>
                      <strong className="d-block mb-1">
                        {item.product.name}
                      </strong>
                      <span>
                        {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
