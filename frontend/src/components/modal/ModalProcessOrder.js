import React, { useRef, useState, useEffect } from "react";
import { formatCurrency } from "../../untils/helpers";
import { toast } from "react-toastify";
import { apiUpdateOrderByAdmin } from "../../service/orderApiService";
const ModalProcessOrder = ({ showModalOrder, dataOrder, onClose, fetchOrders }) => {
    const modalRef = useRef(null);
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("")
    useEffect(() => {
        if (showModalOrder) {
            setOrder(dataOrder);
            setStatus(dataOrder.status)
            modalRef.current.focus();
        }
    }, [showModalOrder]);

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmUpdate()
            handleCloseModal();
        } else if (event.key === "Escape") {
            handleCloseModal();
        }
    };
    const getImgOfProduct = (item) => {
        const img = item?.product?.options.find(option => option.color === item.color).images[0];
        return img
    }

    const handleConfirmUpdate = async () => {
        const response = await apiUpdateOrderByAdmin({ oid: order._id, status: status })
        if (response.EC === 0) {
            toast.success("Cập nhật trạng thái đơn hàng thành công!")
            fetchOrders()
            handleCloseModal();
        }
        else {
            toast.error("Cập nhật trạng thái không thành công")
        }
    }
    const handleCloseModal = () => {
        onClose();
        setOrder({}); // Xóa trạng thái order khi đóng modal
        setStatus(""); // Reset trạng thái đơn hàng
    };


    return (
        <div className={`modal fade ${showModalOrder ? 'show' : ''}`} tabIndex="-1" style={{ display: showModalOrder ? 'block' : 'none' }}
            ref={modalRef} onClick={handleCloseModal} onKeyDown={handleOnKeyDown}>
            <div className="modal-dialog" style={{ margin: "0 auto", minWidth: "80vw" }} >
                <div className="modal-content " onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Thông tin đơn hàng
                        </h1>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <label>Thông tin sản phẩm: </label>
                        {order && order.products && order.products.length > 0 && order.products.map((item, index) => {
                            return (
                                <div key={`productItem-${index}`}>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <img type='button' src={getImgOfProduct(item)} alt={item?.product?.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                            <div className="ms-2">
                                                <label >{item?.product?.title} - {item.size} - {item.color}</label>
                                                <div>{formatCurrency(item.price)} x {item.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className="d-flex justify-content-between">
                            <label>Tên người nhận: </label>
                            <label >{order?.orderBy?.userName}</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Địa chỉ giao hàng: </label>
                            <label >{order?.orderBy?.address}</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Số điện thoại: </label>
                            <label >{order?.orderBy?.phoneNumber}</label>
                        </div>
                        <hr />

                        <div className="d-flex justify-content-between mt-1">
                            <label>Giá sản phẩm: </label>
                            <label >{formatCurrency(order.initialTotalPrice)}</label>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <label>Phí giao hàng: </label>
                            <label >{formatCurrency(order.shippingPrice)}</label>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <label>Giảm giá: </label>
                            <label >{order.discount}%</label>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <h5>Tổng tiền: </h5>
                            <h5 className="fw-bold" >{formatCurrency(order.totalPrice)}</h5>
                        </div>

                        <hr />
                        <label className="fw-bold me-3">Trạng thái đơn hàng: </label>
                        <select className="form-select w-75 mt-2 d-inline" value={status} onChange={(e) => { setStatus(e.target.value) }} >
                            <option value={"Hủy"}>Hủy</option>
                            <option value={"Đang xử lí"}>Đang xử lí</option>
                            <option value={"Đang chuẩn bị hàng"}>Đang chuẩn bị</option>
                            <option value={"Đang giao hàng"}>Đang giao hàng</option>
                        </select>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                        <button type="button" className="btn btn-primary" onClick={() => { handleConfirmUpdate() }}>
                            Lưu
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalProcessOrder