import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Nav from './components/navigation/nav';
import { BrowserRouter } from "react-router-dom";
import Home from './components/homePage/Home';
import Product from './components/productPage/Product';
import ProductOnSale from './components/productOnSalePage/ProductOnSale';
import Instruction from './components/instructionPage/Instruction';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header />
          <Nav />
        </header>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/san-pham"
              element={<Product />}
            />
            <Route path="/san-pham" element={<Product />} >
              {/* Đường dẫn của route con bắt đầu với đường dẫn của route cha */}
              {/* <Route path="/san-pham/" element={<ModalCreateUser />} />
                    <Route path="update" element={<ModalCreateUser />} />
                    <Route path="delete" element={<ModalCreateUser />} /> */}
            </Route>
            <Route path='/sale' element={<ProductOnSale />} />
            <Route path='/huong-dan-mua-hang' element={<Instruction />} />
            {/* Xử lý các trang ngoại lệ */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
