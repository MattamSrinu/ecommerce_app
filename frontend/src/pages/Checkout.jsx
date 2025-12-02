import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [amount, setAmount] = useState(0);
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loadTotal = async () => {
      try {
        const res = await api.get("cart/");
        const total = res.data.reduce((t, item) => t + item.product_price * item.quantity,0);
        setAmount(total);
        if (total === 0) {
          alert("Cart is empty!");
          navigate("/cart");
        }
      } catch (err) {
        alert("Cart is empty!");
        navigate("/cart");
      }
    };
    loadTotal();
  }, []);

  const handlePayment = async () => {
    if (!upi.includes("@")) {
      alert("Enter a valid UPI ID");
      return;
    }
    setProcessing(true);
    try {
      await api.post("payment/upi/", { upi_id: upi });
      setTimeout(() => {
        setProcessing(false);
        setPaid(true);
      }, 1500); // fake delay
    } catch (err) {
      setProcessing(false);
      alert("Payment Failed!");
    }
  };

  const placeOrder = async () => {
    await api.post("orders/create/");
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-3">Checkout</h3>
      <div className="card p-4 shadow-sm rounded-4">
        <h4 className="fw-bold mb-3">Total Amount: ₹{amount}</h4>
        {!paid ? (
          <>
            <label className="form-label fw-semibold">UPI Payment</label>
            <input
              className="form-control rounded-3"
              placeholder="example@upi"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
            <div className="text-center mt-4">
              <img
                src="https://pvccardprinting.in/wp-content/uploads/2025/03/bhim-upi-qr-code-print.webp"
                alt="UPI QR"
                style={{ width: "150px" }}
                className="shadow-sm rounded"
              />
              <p className="text-muted mt-2">Scan & Pay (Fake)</p>
            </div>

            {processing && (
              <p className="text-warning fw-semibold text-center mt-3">
                Processing payment…
              </p>
            )}

            <button
              className="btn btn-dark w-100 mt-3 rounded-3"
              onClick={handlePayment}
              disabled={processing}
            >
              Pay ₹{amount}
            </button>
          </>
        ) : (
          <>
            <p className="text-success fw-bold text-center mt-3">
              ✔ Payment Successful
            </p>

            <button
              className="btn btn-primary w-100 mt-3 rounded-3"
              onClick={placeOrder}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
