import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/public/homePage/Home";
import Instruction from "./components/instructionPage/Instruction";
import Announcement from "./components/announcement/Announcement";
import ProductDetails from "./pages/public/productDetails/ProductDetails";
import Login from "./pages/public/login/Login";
import Register from "./pages/public/register/Register";
import Header from './components/header/Header';
import Nav from './components/navigation/Nav';
import ProductPage from "./pages/public/productPage";
import ScrollToTop from "./components/scroll";
import AdminLayOut from "./pages/admin/AdminLayOut";
import Dashboard from "./pages/admin/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrder from "./pages/admin/ManageOrder";
import ManageUsers from "./pages/admin/ManageUsers";
import { useDispatch } from "react-redux";
import { fetchProductCategories } from "./redux/prodCategorySlice";
import { useEffect } from "react";
import OrderPage from "./pages/public/OrderPage";
import CartDetailsPage from "./pages/public/CartDetailsPage";
import UserLayout from "./pages/user/UserLayout";
import PersonalInfor from "./pages/user/PersonalInfor";
import OrderHistory from "./pages/user/OrderHistory";
import Pants from "./pages/public/Pants";
import Shirt from "./pages/public/Shirt";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <div className="header-page">
          <Header />
          <Nav />
        </div>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLayOut />}>
            <Route path="thong-ke" element={<Dashboard />} />
            <Route path="tao-san-pham" element={<CreateProduct />} />
            <Route path="quan-li-san-pham" element={<ManageProducts />} />
            <Route path="quan-li-don-hang" element={<ManageOrder />} />
            <Route path="quan-li-nguoi-dung" element={<ManageUsers />} />
          </Route>

          <Route path="/user" element={<UserLayout />} >
            <Route path="profile/:uid" element={<PersonalInfor />} />
            <Route path="don-hang" element={<CreateProduct />} />
            <Route path="lich-su-mua-hang" element={<OrderHistory />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thanh-toan" element={<OrderPage />} />
          <Route path="/san-pham" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/pants" element={<Pants />} />
          <Route path="/shirt" element={<Shirt />} />
          <Route path="/chi-tiet-gio-hang" element={<CartDetailsPage />} />

          <Route path="/sale" element={<ProductPage />} />
          <Route path="/huong-dan-mua-hang" element={<Instruction />} />
          <Route path="/thong-bao" element={<Announcement />} />
          {/* Xử lý các trang ngoại lệ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </BrowserRouter >

  );
}

export default App;
