import React, { useEffect, useState, useCallback } from "react";
import { apiGetAllUsers } from "../../service/userApiService";
import ReactPaginate from 'react-paginate';
import ModalEditUser from "../../components/modal/ModalEditUser"
import ModalDeleteUser from "../../components/modal/ModalDeleteUsers";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [dataUser, setDataUser] = useState({})
    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = useCallback(async () => {
        const response = await apiGetAllUsers({ sort: "-createdAt", page: currentPage, limit: limit });
        if (response && response.EC === 0) {
            setUsers(response.DT);
            setTotalPages(response.totalPages);
        }
    }, [currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);

    }

    //edit user
    const handleEditUser = (item) => {
        setShowModalEditUser(true);
        setDataUser(item)
    }
    const handleCloseModalEdit = () => {
        setShowModalEditUser(false);
        setDataUser({})
    }

    //delete user
    const handleDeletedUser = (item) => {
        setShowModalConfirm(true)
        setDataUser(item);
    }
    const handleCloseModalDelete = () => {
        setShowModalConfirm(false);
        setDataUser({})
    };

    return (
        <div style={{ marginTop: "11px" }}>
            <h2>Quản lí người dùng</h2>
            <hr style={{ marginTop: "13px" }} />
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Sđt</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Chức vụ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <th scope="row">{((currentPage - 1) * limit) + index + 1}</th>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item?.role === 'admin' ? "Quản trị viên" : "Người dùng"}</td>
                                    <td className={`${item.isBlocked ? "text-danger" : "text-success"}`}>{item.isBlocked ? "Chặn" : "Bình thường"}</td>
                                    <td>
                                        <button className="btn btn-secondary me-2" onClick={() => { handleEditUser(item) }}>
                                            Sửa
                                        </button>
                                        <button className="btn btn-danger" onClick={() => { handleDeletedUser(item) }}>
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
            <ModalEditUser
                showModalEditUser={showModalEditUser}
                onClose={handleCloseModalEdit}
                dataUser={dataUser}
                fetchUsers={fetchUsers}
            />

            <ModalDeleteUser
                showModalConfirm={showModalConfirm}
                onClose={handleCloseModalDelete}
                dataUser={dataUser}
                fetchUsers={fetchUsers}
            />


        </div>
    )
}

export default ManageUsers