import React, { useState, useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { apiGetOrdersByAdmin } from "../../service/orderApiService";
import ModalProcessOrder from "../../components/modal/ModalProcessOrder";
import { formatCurrency } from "../../untils/helpers";
const ManageOrder = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [orders, setOrders] = useState([]);
    const [showModalOrder, setShowModalOrder] = useState(false)
    const [dataOrder, setDataOrder] = useState({})
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    }
    useEffect(() => {
        fetchOrders()
    }, [currentPage])
    const fetchOrders = useCallback(async () => {
        const response = await apiGetOrdersByAdmin({ page: currentPage, limit, sort: "-createdAt" });
        if (response && response.EC === 0) {
            setOrders(response.DT);
            setTotalPages(response.totalPages);
        }
    }, [currentPage])


    const handleUpdateOrder = (item, stt) => {
        setShowModalOrder(true)
        const orderData = JSON.parse(JSON.stringify(item));
        setDataOrder(prev => ({ ...orderData, status: stt }))
    }

    const handleCloseModal = () => {
        setShowModalOrder(false)
        setDataOrder({})
    }
    return (
        <div style={{ marginTop: "3px" }}>
            <div className="d-flex justify-content-between">
                <h2>Quản lí đơn hàng</h2>
            </div>
            <hr style={{ marginTop: "13px" }} />
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Tên người mua</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Trạng thái </th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 && orders.map((item, index) => {
                            return (
                                <tr key={item._id} className="text-center" >
                                    <th scope="row px-0">{((currentPage - 1) * limit) + index + 1}</th>
                                    <td className="text-break">{item._id}</td>
                                    <td >{item.orderBy.userName || item.orderBy.user}</td>
                                    <td>{item.orderBy.address}</td>
                                    <td>{item.orderBy.phoneNumber}</td>
                                    <td className={`${item.status === "Hủy" ? "text-danger" : `${item.status === "Đang xử lí" ? "text-warning" : "text-success"}`}`}>
                                        {item.status}
                                    </td>
                                    <td>{formatCurrency(item.totalPrice)}</td>
                                    <td>
                                        {item.status === "Đang xử lí" &&
                                            <button className="btn btn-secondary me-sm-2 mb-sm-0 mb-2"
                                                onClick={() => { handleUpdateOrder(item, "Đang chuẩn bị hàng") }} >
                                                Đang chuẩn bị
                                            </button>
                                        }
                                        {item.status === "Đang xử lí" &&
                                            <button className="btn btn-danger me-sm-2 mb-sm-0 mb-2"
                                                onClick={() => { handleUpdateOrder(item, "Hủy") }} >
                                                Hủy
                                            </button>
                                        }
                                        {item.status === "Đang chuẩn bị hàng" &&
                                            <button className="btn btn-secondary me-sm-2 mb-sm-0 mb-2"
                                                onClick={() => { handleUpdateOrder(item, "Đang giao hàng") }} >
                                                Đang giao hàng
                                            </button>
                                        }



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

            <ModalProcessOrder
                dataOrder={dataOrder}
                showModalOrder={showModalOrder}
                onClose={handleCloseModal}
                fetchOrders={fetchOrders}
            />
        </div>
    )
}

export default ManageOrder