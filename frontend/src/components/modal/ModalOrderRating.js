import React, { useRef, useState, useEffect } from "react";
import { formatCurrency } from "../../untils/helpers";
import { toast } from "react-toastify";
import { apiUpdateOrderByAdmin } from "../../service/orderApiService";
import { FaRegStar, FaStar } from "react-icons/fa";
import { apiRatings } from "../../service/productApiService";
const ModalOrderRating = ({ showModalRating, dataOrder, onClose, fetchOrders }) => {
    const modalRef = useRef(null);
    const [order, setOrder] = useState({});
    const [selectedStar, setSelectedStar] = useState(0);
    const [comment, setComment] = useState("");
    const [ratingLabel, setRatingLabel] = useState("")
    useEffect(() => {
        if (showModalRating) {
            setOrder(dataOrder);
            modalRef.current.focus();
        }
    }, [showModalRating]);

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmRating()
            handleCloseModal();
        } else if (event.key === "Escape") {
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
        setSelectedStar(0)
        setRatingLabel(""); // Reset trạng thái đơn hàng
    };

    const handleRating = (starIndex) => {
        const labels = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];
        if (selectedStar === starIndex) {
            // Nếu ngôi sao đã được chọn, click lần nữa sẽ bỏ chọn
            setSelectedStar(starIndex - 1);
            setRatingLabel(labels[starIndex - 2]);
        } else {
            // Nếu ngôi sao chưa được chọn, chọn ngôi sao đó
            setSelectedStar(starIndex);
            setRatingLabel(labels[starIndex - 1]);
        }
    };

    const handleConfirmRating = async () => {
        if (selectedStar === 0) {
            toast.error("Vui lòng chọn số sao !");
            return;
        }
        try {
            const promises = order.products.map(async (item) => {
                const response = await apiRatings({
                    pid: item.product._id,
                    star: selectedStar,
                    comment: comment,
                    orderInfor: order._id
                });
                return response;
            });

            const results = await Promise.all(promises);

            const allSuccess = results.every(result => result && result.EC === 0);

            if (allSuccess) {
                toast.success("Đánh giá tất cả sản phẩm thành công!");
                fetchOrders(); // Cập nhật lại danh sách đơn hàng
                handleCloseModal();
            } else {
                toast.error("Một số đánh giá thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    }


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
                                            {[1, 2, 3, 4, 5].map(starIndex => (
                                                <div key={`order-rating-${starIndex}`} onClick={() => handleRating(starIndex)}>
                                                    {selectedStar >= starIndex ? <FaStar color="gold" /> : <FaRegStar />}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ms-5 text-warning" > {ratingLabel}</div>
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
                        <button type="button" className="btn btn-primary" onClick={() => { handleConfirmRating() }}>
                            Lưu
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ModalOrderRating
