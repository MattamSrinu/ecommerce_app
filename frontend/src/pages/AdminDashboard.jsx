import { useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({name: "",description: "",price: "",category: "",stock: "",});

  const loadProducts = async () => {
    const res = await api.get("products/");
    setProducts(res.data);
  };

  const loadOrders = async () => {
    const res = await api.get("orders/all/");
    setOrders(res.data);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    await api.post("products/add/", form);
    setForm({ name: "", description: "", price: "", category: "", stock: "" });
    loadProducts();
    alert("Product added!");
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete product?")) {
      await api.delete(`products/delete/${id}/`);
      loadProducts();
    }
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`orders/update/${id}/`, { status });
    loadOrders();
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Add Product</h4>
          <form onSubmit={createProduct} className="card p-3 shadow-sm">
            <input className="form-control mb-2" placeholder="Product Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea className="form-control mb-2" placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input type="number" className="form-control mb-2" placeholder="Price" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input className="form-control mb-2" placeholder="Category" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input type="number" className="form-control mb-2" placeholder="Stock" value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <button className="btn btn-dark">Add Product</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Product List</h4>
          <table className="table table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5">
        <h4>All Orders</h4>
        {orders.map((order) => (
          <div key={order.id} className="card p-3 mb-3 shadow-sm">
            <h5>Order #{order.id}</h5>
            <p>User: {order.user}</p>
            <p>Status: {order.status}</p>

            <select className="form-select w-25" value={order.status}onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <p className="mt-3"><strong>Total:</strong> ₹{order.total_price}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name} — {item.quantity} × ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
