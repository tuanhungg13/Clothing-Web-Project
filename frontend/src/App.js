import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/public/homePage/Home";
import Instruction from "./components/instructionPage/Instruction";
import Announcement from "./components/announcement/Announcement";
import ProductDetails from "./components/productDetails/ProductDetails"
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from './components/header/Header';
import Nav from './components/navigation/Nav';
import SidebarProduct from "./components/sidebar/SidebarProduct";
import ProductPage from "./pages/public/productPage";
import ScrollToTop from "./components/scroll";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Nav />

        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />

          <Route path="/san-pham" element={<ProductPage />} />
          <Route path="/:productId" element={<ProductDetails />} />

          {/* <Route path="/sale" element={<ProductOnSale />} /> */}
          <Route path="/huong-dan-mua-hang" element={<Instruction />} />
          <Route path="/thong-bao" element={<Announcement />} />
          <Route path="/sidebar" element={<SidebarProduct />} />
          {/* Xử lý các trang ngoại lệ */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
