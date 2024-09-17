import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { apiGetProducts } from "../service/productApiService";
import { formatCurrency } from "../untils/helpers";
import { useNavigate, useParams } from "react-router-dom";
const Search = () => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");  // State để lưu giá trị input
    const searchRef = useRef(null);  // Tạo ref để theo dõi click ngoài vùng tìm kiếm
    const navigation = useNavigate()
    useEffect(() => {

        fetchProducts(query);
    }, [query]);

    const fetchProducts = async (query) => {
        try {
            const response = await apiGetProducts({ page: 1, limit: 6, title: query });
            if (response && response.EC === 0) {
                setResults(response.DT);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewProduct = (slug) => {
        console.log("no no")
        if (!slug) return;
        navigation(`/products/${slug}`);  // Điều hướng đến trang sản phẩm
    }
    return (
        <>
            <div className="d-md-block d-none" >
                <div className="account dropdown text-end me-3">
                    <a href="#" className="d-block link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false"
                        onClick={() => { searchRef.current.focus() }}>
                        <div className="searchTop d-flex justify-content-between flex-column">
                            <div className="d-flex justify-content-between">
                                <input ref={searchRef}
                                    type="text"
                                    className="w-100"
                                    placeholder="Bạn cần tìm gì?"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); }}
                                />
                                <button><IoSearch className="icons" /></button>
                            </div>



                        </div>
                    </a>

                    <ul className="dropdown-menu text-small">
                        <div className="bg-light mt-2" style={{ zIndex: "1000" }}>
                            {results && results.length > 0 && results.map((item, index) => {
                                return (
                                    <li key={index} className="d-flex justify-content-between mt-2 pt-2" style={{ height: "50px" }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "lightgray"; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                        onClick={() => { handleViewProduct(item.slug) }}>
                                        <img src={item.options[0].images[0]} alt={item.title} className="ps-2" style={{ width: "50px", height: "80%" }} />
                                        <label style={{ fontSize: "14px" }} className="ms-3 me-4">{item.title}</label>
                                        <label style={{ fontSize: "14px" }} className="me-2">{formatCurrency(item.price)}đ</label>
                                    </li>
                                );
                            })}
                        </div>
                    </ul>
                </div>


            </div>


            <div className="d-md-none d-block" >
                <div className="col-12 d-flex justify-content-between flex-column px-3">
                    <div className="d-flex justify-content-between">
                        <input
                            type="text"
                            placeholder="Bạn cần tìm gì?"
                            className="w-100 ps-3 rounded-2 border-1"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); }}
                        />
                    </div>

                    <div className="bg-light mx-1" >
                        {results && results.length > 0 && results.map((item, index) => {
                            return (
                                <div key={index} className="d-flex justify-content-between mt-2" style={{ height: "50px" }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "lightgray"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                    onClick={() => { handleViewProduct(item.slug) }}>
                                    <img src={item.options[0].images[0]} alt={item.title} className="ps-2" style={{ width: "50px", height: "80%" }} />
                                    <label style={{ fontSize: "14px" }} className="ms-3 me-4">{item.title}</label>
                                    <label style={{ fontSize: "14px" }} className="me-2">{formatCurrency(item.price)}đ</label>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Search;
