import React, { Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/public/homePage/Home";
import Announcement from "./pages/public/Announcement";
import ProductDetails from "./pages/public/productDetails/ProductDetails";
import Login from "./pages/public/login/Login";
import Register from "./pages/public/register/Register";
import Header from './components/header/Header';
import Nav from "./components/navigation/Nav";
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
import Notification from "./pages/admin/Notification";
import ManageBlog from "./pages/admin/ManageBlog";
import AnnouncementDetails from "./pages/public/AnnoucementDetails";
import UpdateBlog from "./pages/admin/UpdateBlog";
import Footer from "./components/Footer";
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
            <Route path="home" element={<Dashboard />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="product-list" element={<ManageProducts />} />
            <Route path="order-list" element={<ManageOrder />} />
            <Route path="user-list" element={<ManageUsers />} />
            <Route path="notification" element={<Notification />} />
            <Route path="blog-list" element={<ManageBlog />} />
            <Route path="blog-list/:bid" element={<UpdateBlog />} />
          </Route>

          <Route path="/user" element={<UserLayout />} >
            <Route path="profile/:uid" element={<PersonalInfor />} />
            <Route path="purchase-history" element={<OrderHistory />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/pants" element={<Pants />} />
          <Route path="/shirt" element={<Shirt />} />
          <Route path="/cart-details" element={<CartDetailsPage />} />
          <Route path="/notification" element={<Announcement />} />
          <Route path="/notification/:bid" element={<AnnouncementDetails />} />
          {/* Xử lý các trang ngoại lệ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
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
