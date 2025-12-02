import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const loadCart = async () => {
    const res = await api.get("cart/");
    setItems(res.data);
  };

  const updateQuantity = async (id, qty) => {
    await api.put(`cart/update/${id}/`, { quantity: qty });
    loadCart();
  };

  const removeItem = async (id) => {
    await api.delete(`cart/remove/${id}/`);
    loadCart();
  };

  const clearCart = async () => {
    await api.delete("cart/clear/");
    loadCart();
  };
  const getTotal = () => {
    return items.reduce(
      (t, item) => t + item.product_price * item.quantity,0);
  };

  useEffect(() => {loadCart();}, []);

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>₹{item.product_price}</td>
                  <td>₹{item.product_price * item.quantity}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ₹{getTotal()}</h4>
          <button className="btn btn-warning me-3" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="btn btn-success" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
