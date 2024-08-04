import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../service/productApiService";
import ReactPaginate from "react-paginate";
import ModalProductDetails from "../../components/modal/ModalProductDetails";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom"
const ManageProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [products, setProducts] = useState([]);
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [dataProduct, setDataProduct] = useState({});
    const [action, setAction] = useState("")
    useEffect(() => {
        fetchProducts()
    }, [currentPage])
    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: "-createdAt", page: currentPage, limit });
        if (response.EC === 0) {
            setProducts(response.DT);
            setTotalPages(response.totalPages);
        }
        return products
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
        fetchProducts();
    }

    const handleViewProduct = (item) => {
        setAction("view")
        setDataProduct(item);
        setShowModalProduct(true);

    }

    const handleEditProduct = (item, e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click của hàng được kích hoạt
        setAction("edit")
        setDataProduct(item);
        setShowModalProduct(true);
    }

    const handleCloseModal = () => {
        setShowModalProduct(false);
        setAction("")
        setDataProduct({})
    }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2>Quản lí sản phẩm</h2>
                <button className="btn btn-success me-3">
                    <NavLink className={"text-light text-decoration-none"} to={"/admin/tao-san-pham"}>Tạo sản phẩm</NavLink>
                </button>
            </div>
            <hr style={{ marginTop: "13px" }} />
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Giá KM</th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Tồn kho</th>
                        <th scope="col">Đã bán</th>
                        <th scope="col">Khuyến mãi</th>
                        <th scope="col">Đánh giá</th>
                        <th scope="col">Hành động</th>

                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => {
                        return (
                            <tr key={item._id} className="text-center" onClick={() => { handleViewProduct(item) }}>
                                <th scope="row">{((currentPage - 1) * limit) + index + 1}</th>
                                <td >
                                    <img src={item.options[0].images[0]} alt="anh-san-pham" style={{ width: "55px" }} />
                                </td>
                                <td >{item.title}</td>
                                <td>{item.price}</td>
                                <td>1</td>
                                <td>{item?.category?.categoryName}</td>
                                <td className={`${+item.stock === 0 ? "text-danger" : `${item.stock < 100 ? "text-warning" : "text-success"}`}`}>
                                    {item.stock}
                                </td>
                                <td>{item.sold}</td>
                                <td className={`${+item.discount === 0 ? "" : "text-success"}`}>{+item.discount === 0 ? "Không" : `-${item.discount}%`}</td>
                                <td>{item.totalRatings} <FaStar style={{ marginBottom: "5px", color: '#ee4d2d' }} /></td>
                                <td>
                                    <button className="btn btn-secondary me-2" onClick={(e) => { handleEditProduct(item, e) }}>
                                        Sửa
                                    </button>
                                    <button className="btn btn-danger" >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <div className="user-footer mt-2">
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
            <ModalProductDetails
                action={action}
                showModalProduct={showModalProduct}
                onClose={handleCloseModal}
                dataProduct={dataProduct}
            />
        </div>
    )
}

export default ManageProducts