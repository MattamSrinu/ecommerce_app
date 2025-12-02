import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`products/${id}/`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post("cart/add/", {
        product: id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to add items to cart!");
      } else {
        alert("Error adding to cart");
      }
    }
  };

  const addToWishlist = async () => {
    await api.post("wishlist/add/", { product: id });
    alert("Added to wishlist!");
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h3 className="text-success fw-bold">₹{product.price}</h3>
          <div className="mt-4 d-flex">
            <button className="btn btn-primary" onClick={addToCart}>
              🛒Add to Cart
            </button>

            <button
              className="btn btn-outline-danger ms-3"
              onClick={addToWishlist}
            >
              ❤️Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
