import React from "react";
import DisplayProduct from "../../components/displayProduct/DisplayProduct";
import SidebarProduct from "../../components/sidebar/SidebarProduct";

const ProductPage = () => {
    return (
        <div className="product-page container">
            <div className="row">
                <div className="col-3">
                    <SidebarProduct />
                </div>
                <div className="col-9">
                    <div className='d-flex justify-content-between p-3 my-4' style={{ backgroundColor: "#f7f7f7" }}>
                        <div className='d-flex'>
                            <span className='d-flex'>Bạn đang xem: </span>
                            <span className='category ms-3 text-uppercase fw-bold text-info'>Sản phẩm</span>
                        </div>

                        <select className="" aria-label="Default select example">
                            <option >Mặc định</option>
                            <option value="1">Giá giảm dần</option>
                            <option value="2">Giá tăng dần</option>
                            <option value="3">Sản phẩm bán chạy</option>
                        </select>
                    </div>
                    <DisplayProduct display={"products"} />

                </div>
            </div>
        </div>
    )
}

export default ProductPage;