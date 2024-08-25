import React, { useRef, useState, useEffect } from "react";
import { formatCurrency } from "../../untils/helpers";
const ModalProcessOrder = ({ showModalOrder, dataOrder, onClose }) => {
    const modalRef = useRef(null);
    const [order, setOrder] = useState({});

    useEffect(() => {
        if (showModalOrder) {
            setOrder(dataOrder);
            modalRef.current.focus();
        }
    }, [showModalOrder]);

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            onClose();
        } else if (event.key === "Escape") {
            onClose();
        }
    };
    const getImgOfProduct = (item) => {
        const img = item?.product?.options.find(option => option.color === item.color).images[0];
        return img
    }

    return (
        <div className={`modal fade ${showModalOrder ? 'show' : ''}`} tabIndex="-1" style={{ display: showModalOrder ? 'block' : 'none' }}
            ref={modalRef} onClick={onClose} onKeyDown={handleOnKeyDown}>
            <div className="modal-dialog" style={{ margin: "150px auto", maxWidth: "60vw" }} >
                <div className="modal-content " onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Thông tin đơn hàng
                        </h1>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <lable>Thông tin sản phẩm: </lable>
                        {order && order.products && order.products.length > 0 && order.products.map((item, index) => {
                            return (
                                <div key={`productItem-${index}`}>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            <img type='button' src={getImgOfProduct(item)} alt={item.product.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                            <div className="ms-2">
                                                <label >{item.product.title} - {item.size} - {item.color}</label>
                                                <div>{formatCurrency(item.product.price)} x {item.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className="d-flex justify-content-between">
                            <label>Tên người nhận: </label>
                            <lebel >{order?.orderBy?.userName}</lebel>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Địa chỉ giao hàng: </label>
                            <lebel >{order?.orderBy?.address}</lebel>
                        </div>
                        <div className="d-flex justify-content-between">
                            <label>Số điện thoại: </label>
                            <lebel >{order?.orderBy?.phoneNumber}</lebel>
                        </div>

                        <div className="d-flex justify-content-between mt-1">
                            <h5>Tổng tiền: </h5>
                            <h5 className="fw-bold" >{order.totalPrice}</h5>
                        </div>

                        <hr />
                        <lable className="fw-bold me-3">Trạng thái đơn hàng: </lable>
                        <select className="form-select w-25 d-inline">
                            <option value={"Hủy"}>Hủy</option>
                            <option value={"Xác nhận đơn hàng"}>Xác nhận đơn hàng</option>
                            <option value={"Đang xử lí"}>Đang xử lí</option>
                        </select>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                    <button className="btn btn-primary">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalProcessOrder