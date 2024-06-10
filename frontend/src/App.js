import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from 'react-router-dom';
import Home from './components/homePage/Home';
import Product from './components/product/productPage/Product';
import ProductOnSale from './components/product/productOnSalePage/ProductOnSale';
import Instruction from './components/instructionPage/Instruction';
import Announcement from './components/announcement/Announcement';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Login from './components/login/Login';

function App() {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/san-pham"
        element={<Product />}
      />

      <Route path='/sale' element={<ProductOnSale />} />
      <Route path='/huong-dan-mua-hang' element={<Instruction />} />
      <Route path='/thong-bao' element={<Announcement />} />
      <Route path='/thong-tin-san-pham' element={<ProductDetails />} />
      {/* Xử lý các trang ngoại lệ */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>

  );
}

export default App;
