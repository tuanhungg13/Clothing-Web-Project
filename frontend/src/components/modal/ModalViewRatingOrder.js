import React, { useRef, useState, useEffect } from "react";
import { formatCurrency, renderStarFromNumber } from "../../untils/helpers";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";

const ModalViewRatingOrder = ({ showModalRating, dataOrder, onClose, fetchOrders }) => {
    const modalRef = useRef(null);
    const [order, setOrder] = useState({});
    useEffect(() => {
        console.log("check show order")
        if (showModalRating) {
            setOrder(dataOrder);
            modalRef.current.focus();
        }
    }, [showModalRating]);

    const handleOnKeyDown = (event) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };
    const getImgOfProduct = (item) => {
        const img = item?.product?.options.find(option => option.color === item.color).images[0];
        return img
    }


    const handleCloseModal = () => {
        onClose();
        setOrder({}); // Xóa trạng thái order khi đóng modal
        setRatingLabel(""); // Reset trạng thái đơn hàng
    };


    return (
        <div className={`modal fade ${showModalRating ? 'show' : ''}`} tabIndex="-1" style={{ display: showModalRating ? 'block' : 'none' }}
            ref={modalRef} onClick={handleCloseModal} onKeyDown={handleOnKeyDown}>
            <div className="modal-dialog" style={{ margin: "0 auto", maxWidth: "60vw" }} >
                <div className="modal-content " onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Đánh giá sản phẩm
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
                                            <img type='button' src={getImgOfProduct(item)} alt={item.product.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                            <div className="ms-2">
                                                <label >{item.product.title} - {item.size} - {item.color}</label>
                                                <div>{formatCurrency(item.product.price)} x {item.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-3 d-flex">
                                        <div className="d-flex">
                                            {renderStarFromNumber(item.star)}
                                        </div>
                                        {item.star === 1 && <div className="ms-5 text-warning" >Rất tệ</div>}
                                        {item.star === 2 && <div className="ms-5 text-warning" >Tệ</div>}
                                        {item.star === 3 && <div className="ms-5 text-warning" >Bình thường</div>}
                                        {item.star === 4 && <div className="ms-5 text-warning" >Tốt</div>}
                                        {item.star === 5 && <div className="ms-5 text-warning" >Tuyệt vời</div>}
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}

                        <div>Nhận xét:</div>
                        <textarea value={comment} className="w-100" style={{ height: "150px" }}
                            onChange={(e) => { setComment(e.target.value) }} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Đóng</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalViewRatingOrder
