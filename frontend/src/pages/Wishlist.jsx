import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import "../styles/wishlist.css";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const loadWishlist = async () => {
    try {
      const res = await api.get("wishlist/");
      setItems(res.data);
    } catch (err) {
      console.log("Wishlist Error:", err);
    }
  };

  const removeItem = async (id) => {
    await api.delete(`wishlist/remove/${id}/`);
    loadWishlist();
  };

  const addToCart = async (productId, wishlistItemId) => {
    try {
      await api.post("cart/add/", { product: productId, quantity: 1 });
      await api.delete(`wishlist/remove/${wishlistItemId}/`);
      loadWishlist();
      alert("Item added to cart!");
    } catch (err) {
      console.log("Add to cart error:", err);
      alert("Could not add to cart.");
    }
  };

  useEffect(() => {loadWishlist();}, []);

  return (
    <div className="container wishlist-container">
      <h3 className="wishlist-title">My Wishlist❤️</h3>
      {items.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="row mt-3">
          {items.map((item) => (
            <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
              <div className="wishlist-card">
                <img
                  src={item.product.image}
                  className="wishlist-img"
                  alt="product"
                />

                <div className="wishlist-card-body">
                  <h5>{item.product.name}</h5>
                  <p className="wishlist-price">₹{item.product.price}</p>

                  <div className="d-grid gap-2">

                    <Link
                      to={`/product/${item.product.id}`}
                      className="btn wishlist-btn btn-view btn-sm"
                    >
                      View Product
                    </Link>

                    <button
                      className="btn wishlist-btn btn-cart btn-sm"
                      onClick={() => addToCart(item.product.id, item.id)}
                    >
                      Add to Cart 🛒
                    </button>

                    <button
                      className="btn wishlist-btn btn-remove btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove❌
                    </button>
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
