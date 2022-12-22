import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/App.scss";
import UserPage from "./pages/UserPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:productId" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/user/:userId/orders" element={<UserOrdersPage />} />
          <Route path="/user/:userId/orders/:orderId" element={<OrderDetailsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
