import React, { useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { apiDeleteByAdmin } from "../../service/userApiService";

const ModalDeleteUser = (props) => {
    const modalRef = useRef(null)
    useEffect(() => {
        if (props.showModalConfirm) {
            modalRef.current.focus()
        }
    }, [props.showModalConfirm])
    //xac nhan chan nguoi dung
    const handleConfirmDeleteUser = async () => {

        const response = await apiDeleteByAdmin({ uid: props.dataUser._id })
        console.log("check response:", response)
        if (response?.EC === 0) {
            toast.success("Xóa người dùng thành công")
            await props.fetchUsers();
        }
        else {
            toast.error("Xóa người dùng thất bại")
        }
        props.onClose()
    }
    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") {
            handleConfirmDeleteUser()
        }
        else if (event.key === "Escape") props.onClose()
    }
    return (
        <div className={`modal fade ${props.showModalConfirm ? 'show' : ''}`} tabIndex="-1" style={{ display: props.showModalConfirm ? 'block' : 'none' }}
            ref={modalRef} onKeyDown={(event) => { handleOnKeyDown(event) }} onClick={props.onClose}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={(event) => { event.stopPropagation() }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Xóa người dùng</h1>
                        <button type="button" className="btn-close" onClick={props.onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: "80px" }}>
                        Bạn có chắc chắn muốn xóa người dùng : {props.dataUser.email}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onClose}>Đóng</button>
                        <button className="btn btn-primary" onClick={() => { handleConfirmDeleteUser() }}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalDeleteUser