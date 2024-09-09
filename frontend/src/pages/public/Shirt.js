import React, { useEffect, useState } from "react";
import DisplayProduct from "../../components/displayProduct/DisplayProduct";
import SidebarProduct from "../../components/sidebar/SidebarProduct";
import ReactPaginate from "react-paginate";
import { apiGetProducts } from "../../service/productApiService";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/Breadcrumbs";
const Shirt = () => {
    const [sortBy, setSortBy] = useState("-createdAt");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 3000000]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSize, setSlectedSize] = useState("");
    useEffect(() => {
        if (selectedCategory && selectedCategory._id && !selectedSize) {
            fetchProducts({ limit, page: currentPage, sort: sortBy, title: "Áo", category: selectedCategory?._id, price: { gt: priceRange[0], lt: priceRange[1] } })
        }
        else if (selectedSize) {
            fetchProducts({ limit, page: currentPage, sort: sortBy, title: "Áo", "options.sizeQuantity.size": selectedSize, category: selectedCategory?._id, price: { gt: priceRange[0], lt: priceRange[1] } })

        }
        else if (selectedCategory && selectedCategory._id && selectedSize) {
            fetchProducts({ limit, page: currentPage, sort: sortBy, title: "Áo", "options.sizeQuantity.size": selectedSize, category: selectedCategory?._id, price: { gt: priceRange[0], lt: priceRange[1] } })

        }
        else {
            fetchProducts({ limit, page: currentPage, sort: sortBy, title: "Áo", price: { gt: priceRange[0], lt: priceRange[1] } })
        }
    }, [sortBy, priceRange, selectedCategory, selectedSize, currentPage])

    const fetchProducts = async (data) => {
        try {
            const response = await apiGetProducts(data);
            if (response && response.EC === 0) {
                setProducts(response.DT);
                setTotalPages(response.totalPages)
            }
        } catch (error) {
            toast.error("Có vui xảy ra.Vui lòng thử lại!")
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        fetchProducts();
    }

    return (
        <div className="product-page container">
            <Breadcrumbs />
            <div className="row">
                <div className="col-sm-3 col-12">
                    <SidebarProduct setProducts={setProducts}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSize={selectedSize}
                        setSlectedSize={setSlectedSize}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>
                <div className="col-sm-9 col-12">
                    <div className='d-flex justify-content-between p-3 my-4' style={{ backgroundColor: "#f7f7f7" }}>
                        <label >Bạn đang xem:
                            <span className="category ms-3 text-uppercase fw-bold text-info">
                                {selectedCategory && selectedCategory.categoryName ? selectedCategory.categoryName : "Áo"}
                            </span>
                        </label>

                        <select className="" aria-label="Default select example" onChange={(event) => { setSortBy(event.target.value) }}>
                            <option value="-createdAt">Mặc định</option>
                            <option value="-price">Giá giảm dần</option>
                            <option value="price">Giá tăng dần</option>
                            <option value="-sold">Sản phẩm bán chạy</option>
                        </select>
                    </div>
                    <DisplayProduct productList={products} />
                    <div className="user-footer mt-2 d-flex justify-content-end">
                        {totalPages > 1 &&
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shirt;