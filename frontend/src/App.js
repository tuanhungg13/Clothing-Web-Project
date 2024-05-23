import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/header';
import Nav from './components/navigation/nav';
import { BrowserRouter } from "react-router-dom";
import Home from './components/home/home';
import Product from './components/product/product';

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
            {/* Xử lý các trang ngoại lệ */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
