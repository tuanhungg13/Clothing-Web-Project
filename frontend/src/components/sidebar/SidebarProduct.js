import React from 'react';
import './SidebarProduct.scss';
import { Slider } from 'antd';
import { useSelector } from "react-redux";

const SidebarProduct = (props) => {
    const categories = useSelector(state => state.productCategories.categories);
    const sizes = [{ name: "S" }, { name: "M" }, { name: "L" }, { name: "XL" }, { name: "XXL" }]
    const onChangeSliderRange = (value) => {
        props.setPriceRange(value);
    };

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleSelectCategory = (category) => {
        props.setSelectedCategory(category);
    };

    const handleSelectSize = (size) => {
        props.setSlectedSize(size);
    }
    return (
        <div className='sidebar-product'>
            <div className="flex-shrink-0 p-3 d-md-block d-none" >
                <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                    <span className="fs-5 fw-semibold mt-1">Danh mục</span>
                </a>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            Sản phẩm
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {categories && categories.length > 0 && categories.map((item, index) => {
                                    return (
                                        <li key={item._id}>
                                            <input type='checkbox' value={item._id} checked={props?.selectedCategory === item}
                                                onChange={() => handleSelectCategory(item)} /> {item.categoryName}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </li>
                    <hr />
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Giá
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <div className="slidecontainer">
                                <Slider
                                    className='content-slider'
                                    tooltip={{
                                        open: false
                                    }}
                                    range
                                    min={0}
                                    max={3000000}
                                    draggableTrack // Cho phép kéo thanh slider để chọn khoảng giá
                                    defaultValue={props.priceRange} // Giá trị mặc định của slider
                                    onChange={onChangeSliderRange} // Hàm được gọi khi slider thay đổi
                                />
                                <div className='price-slider d-flex justify-content-between'>
                                    <div >{formatCurrency(props?.priceRange[0])}đ</div>
                                    <div>{formatCurrency(props?.priceRange[1])}đ</div>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>Sắp xếp</div>
                                    <select className="" aria-label="Default select example" style={{ width: '120px' }} >
                                        <option value={"-createdAt"}>Mặc định</option>
                                        <option value="-price">Giá giảm dần</option>
                                        <option value="price">Giá tăng dần</option>
                                    </select>
                                </div>
                            </div>


                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            </ul>
                        </div>
                    </li>
                    <hr />
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            Kích cỡ
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className="size-product btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {sizes && sizes.length > 0 && sizes.map((size, index) => {
                                    return (
                                        <li key={`sizeSelect-${index}`}>
                                            <input type='checkbox' value={size.name} checked={props?.selectedSize === size.name} onChange={() => handleSelectSize(size.name)} />
                                            <span className='ms-1' style={{ fontSize: "18px" }}>{size.name}</span>
                                        </li>
                                    )
                                })}


                            </ul>
                        </div>
                    </li>

                </ul>
            </div>

            <div className="btn-toggler d-md-none d-block ">
                <div className="container-fluid m-auto">
                    <button className="navbar-toggler btn mb-1  mt-3 mt-sm-0 px-2" style={{ height: "30px", borderRadius: "5px", border: "1px solid #d7d7d7", backgroundColor: "#d7d7d7" }}
                        type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="true" aria-label="Toggle navigation">
                        Lọc sản phẩm
                    </button>
                    <div className="container-nav navbar-collapse collapse" id="navbarsExample01">
                        <div className="topnav d-flex flex-column text-none " >
                            <ul className="list-unstyled ps-0">
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                        Sản phẩm
                                    </button>
                                    <div className="collapse" id="home-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {categories && categories.length > 0 && categories.map(item => {
                                                return (
                                                    <li key={item._id}>
                                                        <input type='checkbox' value={item._id} checked={props?.selectedCategory === item._id}
                                                            onChange={() => handleSelectCategory(item)} /> {item.categoryName}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </li>
                                <hr />
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                        Giá
                                    </button>
                                    <div className="collapse" id="dashboard-collapse">
                                        <div className="slidecontainer">
                                            <Slider
                                                className='content-slider'
                                                tooltip={{
                                                    open: false
                                                }}
                                                range
                                                min={0}
                                                max={3000000}
                                                draggableTrack // Cho phép kéo thanh slider để chọn khoảng giá
                                                defaultValue={props?.priceRange} // Giá trị mặc định của slider
                                                onChange={onChangeSliderRange} // Hàm được gọi khi slider thay đổi
                                            />
                                            <div className='price-slider d-flex justify-content-between'>
                                                <div >{formatCurrency(props?.priceRange[0])}đ</div>
                                                <div>{formatCurrency(props?.priceRange[1])}đ</div>
                                            </div>
                                            <div className='d-flex justify-content-between mt-3'>
                                                <div>Sắp xếp</div>
                                                <select className="" aria-label="Default select example" style={{ width: '120px' }} >
                                                    <option value={"-createdAt"}>Mặc định</option>
                                                    <option value="-price">Giá giảm dần</option>
                                                    <option value="price">Giá tăng dần</option>
                                                </select>
                                            </div>
                                        </div>


                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        </ul>
                                    </div>
                                </li>
                                <hr />
                                <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                        Kích cỡ
                                    </button>
                                    <div className="collapse" id="orders-collapse">
                                        <ul className="size-product btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {sizes && sizes.length > 0 && sizes.map((size, index) => {
                                                return (
                                                    <li key={`sizeSelect-${index}`}>
                                                        <input type='checkbox' value={size.name} checked={props.selectedSize === size.name} onChange={() => handleSelectSize(size.name)} />
                                                        <span>{size.name}</span>
                                                    </li>
                                                )

                                            })}


                                        </ul>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SidebarProduct;
