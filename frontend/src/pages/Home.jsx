import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
              alt="Product 1"
            />
            <Carousel.Caption>
              <h3>Top Electronics</h3>
              <p>Upgrade to the latest gadgets at best prices.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://i.pinimg.com/564x/d8/87/50/d88750111f09ee043aed3e968f924174.jpg"
              alt="Product 2"
            />
            <Carousel.Caption>
              <h3>Fashion Trends</h3>
              <p>Fresh styles that match your vibe.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://m.media-amazon.com/images/G/31/img21/CEPC/Jup25/Hero/PEA/Unrec/Banner1_LowestDeal_Xiaomi._SX1242_QL85_.jpg"
              alt="Product 3"
            />
            <Carousel.Caption>
              <h3>Electronics Trends</h3>
              <p>Fresh styles that match your vibe.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://img.freepik.com/free-photo/eco-friendly-cleaning-products-set-basket-with-soaps-brushes_23-2148818497.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Product 4"
            />
            <Carousel.Caption>
              <h3>Home Essentials</h3>
              <p>Make your home smarter and stylish.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="deal-banner container mt-5 p-4 rounded text-center text-white">
        <h2 className="fw-bold mb-2">🔥 Deal of the Day</h2>
        <p className="mb-3">Up to 50% OFF on selected electronics</p>
        <button className="btn btn-light px-4" onClick={() => navigate("/products")}>
          Shop Now
        </button>
      </div>

      <div className="container mt-5">
        <h2 className="fw-bold text-center mb-4">Shop by Category</h2>
        <div className="row g-4">
          <div className="col-md-3 col-6">
            <div className="category-card p-3 text-center" onClick={() => navigate("/products")}>
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                className="category-img"
                alt="Electronics"
              />
              <h5 className="mt-3">Electronics</h5>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="category-card p-3 text-center" onClick={() => navigate("/products")}>
              <img
                src="https://www.theblockart.com/ImageStorage/big/BA2024062024132842297050.jpeg"
                className="category-img"
                alt="Fashion"
              />
              <h5 className="mt-3">Fashion</h5>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="category-card p-3 text-center" onClick={() => navigate("/products")}>
              <img
                src="https://images.woodenstreet.de/wsnew2024/static-webmedia/images/home-decor/icon1.jpg"
                className="category-img"
                alt="Home"
              />
              <h5 className="mt-3">Home</h5>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="category-card p-3 text-center" onClick={() => navigate("/products")}>
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                className="category-img"
                alt="Accessories"
              />
              <h5 className="mt-3">Accessories</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h2 className="fw-bold mb-4">Best Sellers in Clothing & Accessories</h2>
        <div className="best-seller-wrapper">
          <div className="best-seller-scroll">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlxTRFABz28ONhcSy5swuy0AUarVHwHpppMQ&s" alt="" />
            <img src="https://smpl-prod-app-v2.gumlet.io/product_img/17868/1726724166_07W.jpg" alt="" />
            <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcrI-IatzmqcqCBWb6x21d17-RfUXW_1jhw&s" alt="" />
            <img src="https://www.stylemati.in/cdn/shop/products/mati-outfit-sets-mati-brown-placket-shirt-and-ankle-pant-set-2-pcs-29853562437721.jpg?v=1657191162" alt="" />
            <img src="https://image01-in.oneplus.net/media/202507/02/2bc17a335d177bd2a6b1f1b4f9036f06.png?x-amz-process=image/format,webp/quality,Q_80" alt="" />
            <img src="https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/29494070/2024/8/28/4945638c-5ffc-4b8e-b8c1-a96a61c7e8651724845060651-HRX-by-Hrithik-Roshan-Men-Pack-Of-5-Ankle-Length-Socks-62617-1.jpg" alt="" />
            <img src="https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Primary_image_Midnight_Blue?$primaryshotPreset$&fmt=png-alpha" alt="" />
            <img src="https://assets.ajio.com/medias/sys_master/root/20231111/FCOy/654f9cb4ddf77915197fd3cb/-473Wx593H-410408513-27e-MODEL.jpg" alt="" />
            <img src="https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/636902s.jpg?im=Resize,width=750" alt="" />
            <img src="https://backend.paiinternational.in/media/images/6_RCdw4du.png" alt="" />
            <img src="https://www.bewakoof.com/blog/wp-content/uploads/2024/06/men-s-grey-wide-leg-korean-pants-633825-1714731432-4-819x1024.webp" alt="" />
            <img src="https://m.media-amazon.com/images/I/41DsvJJr4JL._SR290,290_AC_.jpg" alt="" />
            <img src="https://www.lapcare.com/cdn/shop/files/1_6122ca29-5373-4c4f-97c2-0728ea368fc1.webp?v=1757326029&width=2048" alt="" />
            <img src="https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/2af70904-c66e-46c8-8289-fdd6b9af02cd/W+NIKE+SHOX+TL.png" alt="" />
            <img src="https://dianora.in/wp-content/uploads/2023/02/24-normal-tv-dianora.png" alt="" />
            <img src="https://www.thechennaimobiles.com/_next/image?url=https%3A%2F%2Fapi.thechennaimobiles.com%2F1753077883834.png&w=1600&q=75" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIElXcppCXqZ2MzdR0rQGPUT1LQIfjdChp_A&s" alt="" />
            <img src="https://hammeronline.in/cdn/shop/files/Bash_2.0_Bluetooth_Headphones.webp?v=1726899059" alt="" />
            <img src="https://www.intex.in/cdn/shop/files/LED-SHF3263_1024x1024.jpg?v=1750331049" alt="" />
            <img src="https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/310960_7_zw0uvl.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h2 className="fw-bold text-center mb-4">Why Shop With Us?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card p-4 text-center">
              <h3>🚚</h3>
              <h5 className="fw-bold">Fast Delivery</h5>
              <p className="text-muted">Get orders at your doorstep quickly.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card p-4 text-center">
              <h3>💳</h3>
              <h5 className="fw-bold">Secure Payment</h5>
              <p className="text-muted">Your transactions are 100% secure.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card p-4 text-center">
              <h3>🏆</h3>
              <h5 className="fw-bold">Premium Quality</h5>
              <p className="text-muted">Top products from trusted sellers.</p>
            </div>
          </div>
        </div>
      </div>
      <section className="cta-section text-center text-white">
        <h2 className="fw-bold">Explore Thousands of Products</h2>
        <p className="mt-2 fs-5">Best deals, premium products, and fast delivery.</p>
        <button className="btn btn-light px-4 py-2 mt-3" onClick={() => navigate("/products")}>
          Start Shopping
        </button>
      </section>
    </div>
  );
}
