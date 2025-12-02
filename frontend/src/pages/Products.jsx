import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import "../styles/products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("products/")
      .then((res) => {
        console.log("Products loaded:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Products API Error:", err);
      });
  }, []);

  const addToCart = async (id) => {
    try {
      await api.post("cart/add/", {
        product: id,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to add items to cart!");
      } else {
        alert("Error adding to cart");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>All Products</h3>
      <div className="row mt-3">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card shadow-sm">
              <img src={p.image} className="product-card-img" alt="" />
              <div className="card-body">
                <h5 className="product-card-title">{p.name}</h5>
                <p className="product-card-price">₹{p.price}</p>
                <div className="d-flex justify-content-between">
                  <Link
                    className="btn btn-dark btn-sm product-card-btn"
                    to={`/product/${p.id}`}
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-primary btn-sm product-card-btn"
                    onClick={() => addToCart(p.id)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
