import React, { useEffect, useState, useCallback } from "react";
import { apiGetProducts } from "../../service/productApiService";
import ReactPaginate from "react-paginate";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import ModalDeleteProduct from "../../components/modal/ModalDeleteProduct";
import { formatCurrency } from "../../untils/helpers";
const ManageProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [products, setProducts] = useState([]);
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [dataProduct, setDataProduct] = useState({});
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        fetchProducts()
        window.scrollTo(0, 0);
    }, [currentPage])

    const fetchProducts = useCallback(async () => {
        const response = await apiGetProducts({ sort: "-createdAt", page: currentPage, limit });
        if (response && response.EC === 0) {
            setProducts(response.DT);
            setTotalPages(response.totalPages);
        }
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    }

    const handleEditProduct = (item) => {
        const productData = JSON.parse(JSON.stringify(item)) //deep copy
        setEdit(true)
        setDataProduct(productData);
    }

    const handleDeleteProduct = (item) => {
        setShowModalProduct(true);
        setDataProduct({
            pid: item._id,
            title: item.title
        })
    }

    const handleCloseModal = () => {
        setShowModalProduct(false);
        setDataProduct({})
    }
    return (
        <>
            {edit && <UpdateProduct dataProduct={dataProduct} setEdit={setEdit} setDataProduct={setDataProduct} fetchProducts={fetchProducts} />}

            {!edit &&
                <div style={{ marginTop: "3px" }}>
                    <div className="d-flex justify-content-between">
                        <h2>Quản lí sản phẩm</h2>
                        <button className="btn btn-success me-3">
                            <NavLink className={"text-light text-decoration-none"} to={"/admin/create-product"}>Tạo sản phẩm</NavLink>
                        </button>
                    </div>
                    <hr style={{ marginTop: "13px" }} />
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">STT</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Danh mục</th>
                                    <th scope="col">Tồn kho</th>
                                    <th scope="col">Đã bán</th>
                                    <th scope="col">Đánh giá</th>
                                    <th scope="col">Hành động</th>

                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((item, index) => {
                                    return (
                                        <tr key={item._id} className="text-center" >
                                            <th scope="row px-0">{((currentPage - 1) * limit) + index + 1}</th>
                                            <td >
                                                <img src={item.options[0].images[0]} alt="anh-san-pham" style={{ width: "55px" }} />
                                            </td>
                                            <td >{item.title}</td>
                                            <td>{formatCurrency(item.price)}</td>

                                            <td>{item?.category?.categoryName}</td>
                                            <td className={`${+item.stock === 0 ? "text-danger" : `${item.stock < 100 ? "text-warning" : "text-success"}`}`}>
                                                {item.stock}
                                            </td>
                                            <td>{item.sold}</td>
                                            <td>{item.totalRatings} <FaStar style={{ marginBottom: "5px", color: '#ee4d2d' }} /></td>
                                            <td>
                                                <button className="btn btn-secondary me-sm-2 mb-sm-0 mb-2" onClick={() => { handleEditProduct(item) }}>
                                                    Sửa
                                                </button>
                                                <button className="btn btn-danger" onClick={() => { handleDeleteProduct(item) }}>
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
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
                    <ModalDeleteProduct
                        showModalProductDelete={showModalProduct}
                        onClose={handleCloseModal}
                        dataProduct={dataProduct}
                        fetchProducts={fetchProducts}
                    />
                </div>}
        </>
    )
}

export default ManageProducts