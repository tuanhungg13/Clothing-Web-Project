import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { apiGetProducts } from "../service/productApiService";
import { formatCurrency } from "../untils/helpers";
import { useNavigate, useParams } from "react-router-dom";
const Search = () => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");  // State để lưu giá trị input
    const navigation = useNavigate()
    const searchRef = useRef(null)
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        fetchProducts(query);
    }, [query]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
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
        if (!slug) return;
        navigation(`/products/${slug}`);  // Điều hướng đến trang sản phẩm
        setDropdownVisible(false)
    }
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setDropdownVisible(false); // Ẩn dropdown khi click ra ngoài
        }
    };
    return (
        <div className="search-component" ref={searchRef}>
            <div className="d-md-block d-none" >
                <div className="searchTop d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-between">
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Bạn cần tìm gì?"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); }}
                            onClick={() => { setDropdownVisible(true) }}
                        />
                        <button><IoSearch className="icons" /></button>
                    </div>
                </div>
                {isDropdownVisible && (
                    <div className="bg-light" style={{ zIndex: "1000", position: "absolute" }}>
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
                    </div>)}
            </div>

            <div className="d-md-none d-block" >
                <input
                    type="text"
                    className="w-100 col-12 m-auto"
                    placeholder="Bạn cần tìm gì?"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); }}
                />

                <div className="bg-light mt-2 " style={{ zIndex: "1000" }}>
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
            </div>


        </div>
    );
};

export default Search;
