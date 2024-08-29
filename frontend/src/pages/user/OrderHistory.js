import React, { useCallback, useEffect, useState } from "react";
import { apiGetOrders, apiUpdateOrderByUser } from "../../service/orderApiService";
import { formatCurrency } from "../../untils/helpers";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    useEffect(() => {
        fetchOrders()
    }, [])
    const fetchOrders = useCallback(async () => {
        const response = await apiGetOrders({ page: currentPage, limit, sort: "-createdAt" });
        if (response.EC === 0) {
            setOrders(response.DT);
            setTotalPages(totalPages)
        }
    }, [])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    }

    const getImgOfProduct = (item) => {
        const img = item?.product?.options.find(option => option.color === item.color).images[0];
        return img
    }

    const handleUpdateOrder = async (oid, status) => {
        const response = await apiUpdateOrderByUser({ oid: oid, status: status })
        if (response.EC === 0) {
            toast.success("Cập nhật đơn hàng thành công!")
            fetchOrders();
        }
        else {
            toast.error(response.EM)
        }
    }

    return (
        <div>
            <h3>Lịch sử mua hàng</h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Ngày đặt hàng</th>
                            <th scope="col">Mã đơn hàng</th>
                            <th colSpan={3} scope="col-3">Thông tin đơn hàng</th>
                            <th>Sản phẩm</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 && orders.map((item, index) => {
                            return (
                                <tr key={`order-ps-${index}`} >
                                    <th scope="row px-0">{item.createdAt?.slice(0, 10)}</th>
                                    <td>{item._id}</td>
                                    <td>
                                        <div className=" d-flex flex-column" style={{ width: "15vw" }} >
                                            <label className="fw-bold">Đến:</label>
                                            <div>{item.orderBy.userName}</div>
                                            <label>{item.orderBy.address}</label>
                                            <label>{item.orderBy.phoneNumber}</label>
                                            <hr className="my-1" />
                                            <label>Tiền sản phẩm: <span className="fst-italic ms-3">{formatCurrency(item.initialTotalPrice)}</span> </label>
                                            <label>Phí giao hàng: <span className="fst-italic ms-3">{formatCurrency(item.shippingPrice)}</span></label>
                                            <label>Giảm giá:<span className="fst-italic" style={{ marginLeft: "60px" }}>{item.discount}%</span> </label>
                                            <label>Tổng tiền: <span className="fst-italic ms-5">{formatCurrency(item.totalPrice)}</span></label>
                                        </div>
                                    </td>
                                    <td colSpan={3} className="">
                                        {item && item.products && item.products.length > 0 && item.products.map((order, index) => {
                                            return (
                                                <div className="d-flex justify-content-center mt-1">
                                                    <div>
                                                        <img src={getImgOfProduct(order)} alt={order.product.title} style={{ width: "60px" }} />
                                                    </div>
                                                    <div className=" ms-1 " style={{ width: "20vw" }}>
                                                        <label>
                                                            {order.product.title}-{order.size} - {order.color}
                                                        </label>
                                                        <label className="d-block">
                                                            {formatCurrency(order.price)} x {order.quantity}
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </td>
                                    <td className={`${item.status === "Hủy" ? "text-danger" : `${item.status === "Đang xử lí" ? "text-warning" : "text-success"}`}`}>{item.status}</td>
                                    <td >
                                        <div className="d-flex flex-column">
                                            <button className="btn btn-success mb-2">Xem đơn hàng</button>
                                            {item.status === "Đang xử lí" &&
                                                <button className="btn btn-danger mb-2" onClick={() => { handleUpdateOrder(item._id, "Hủy") }}>
                                                    Hủy
                                                </button>
                                            }
                                            {item.status === "Đang giao hàng" &&
                                                <button className="btn btn-primary mb-2" onClick={() => { handleUpdateOrder(item._id, "Đã nhận hàng") }} >
                                                    Đã nhận hàng
                                                </button>
                                            }
                                            {item.status === "Đã nhận hàng" &&
                                                <button className="btn btn-warning mb-2">Đánh giá</button>}
                                            {item.status === "Đã đánh giá" && <button className="btn-secondary">Xem đánh giá</button>}
                                        </div>

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
        </div>
    )
}

export default OrderHistory