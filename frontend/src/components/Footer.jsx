import "../styles/footer.css";
export default function Footer() {
  return (
    <footer className="footer-section text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">MyShop</h5>
            <p className="footer-text">
              Your trusted destination for quality products at the best prices.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-text mb-1">
              📞 <strong>+122 861321466546</strong>
            </p>
            <p className="footer-text mb-1">
              📧 support@myshop.com
            </p>
            <p className="footer-text">
              🕒 Mon – Sat: 4:00 AM – 11:00 PM
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/products">Products</a></li>
              <li><a href="/wishlist">My Wishlist</a></li>
              <li><a href="/cart">My Cart</a></li>
              <li><a href="/account">My Account</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center py-2">
        © 2025 MyShop | All Rights Reserved
      </div>
    </footer>
  );
}
