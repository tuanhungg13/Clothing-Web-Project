import React, { useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { apiDeleteProduct } from "../../service/productApiService";
const ModalDeleteProduct = (props) => {
    const modalRef = useRef(null)
    useEffect(() => {
        if (props.showModalProductDelete) {
            modalRef.current.focus()
        }
    }, [props.showModalProductDelete])
    //xac nhan chan nguoi dung
    const handleConfirmDeleteProduct = async () => {
        const response = await apiDeleteProduct({ pid: props.dataProduct.pid })
        if (response?.EC === 0) {
            toast.success("Xóa sản phẩm thành công!")
            await props.fetchProducts();
        }
        else {
            toast.error("Xóa sản phẩm thất bại")
        }
        props.onClose()
    }
    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmDeleteProduct()
        }
        else if (event.key === "Escape") props.onClose()
    }
    return (
        <div className={`modal fade ${props.showModalProductDelete ? 'show' : ''}`} tabIndex="-1" style={{ display: props.showModalProductDelete ? 'block' : 'none' }}
            ref={modalRef} onKeyDown={(event) => { handleOnKeyDown(event) }} onClick={props.onClose}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-danger">Xóa Sản phẩm</h1>
                        <button type="button" className="btn-close" onClick={props.onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: "80px" }}>
                        Bạn có chắc chắn muốn xóa sản phẩm :
                        <span className="text-success"> {props.dataProduct.title}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onClose}>Đóng</button>
                        <button className="btn btn-danger" onClick={() => { handleConfirmDeleteProduct() }}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalDeleteProduct