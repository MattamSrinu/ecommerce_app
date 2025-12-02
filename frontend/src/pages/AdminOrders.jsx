import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const BASE_URL = "http://localhost:8000";
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    try {
      const res = await api.get("orders/all/");
      setOrders(res.data);
    } catch (err) {
      alert("Access denied! Only admin can view this page.");
    }
  };
  useEffect(() => {loadOrders();}, []);

  const updateStatus = async (id, status) => {
    await api.put(`orders/update/${id}/`, { status });
    alert("Order status updated!");
    loadOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    await api.delete(`orders/admin-delete/${id}/`);
    alert("Order deleted!");
    loadOrders();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin - Manage Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card shadow-sm p-4 my-3 rounded-4">
          <h5>Order #{order.id}</h5>
          <p>
            User: <strong>{order.user_name}</strong>
          </p>
          <p>Status: <strong>{order.status}</strong></p>
          <select className="form-select w-25 mb-3" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <h6>Items:</h6>
          {order.items.map((item) => {
            const imageUrl =item.product.image.startsWith("/media")
                ? BASE_URL + item.product.image : item.product.image
            return (
              <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                <img src={imageUrl} alt={item.product.name} style={{width: "65px",height: "65px",
                objectFit: "cover",borderRadius: "10px",marginRight: "15px",}}/>
                <div>
                  <strong>{item.product.name}</strong>
                  <p className="mb-0">
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
            );
          })}
          <p>
            <strong>Total:</strong> ₹{order.total_price}
          </p>
          <button className="btn btn-danger" onClick={() => deleteOrder(order.id)}>
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
}
