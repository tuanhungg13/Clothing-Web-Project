import React, { useEffect } from 'react';
import "./DisplayProduct.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "./displayProductSlice"
import { formatCurrency } from "../../untils/helpers";
import { useNavigate } from 'react-router-dom';
const DisplayProduct = (props) => {
    const products = useSelector(state => state.displayProduct[props.display]);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleGetDetailsProduct = (item) => {
        navigation(`${item.slug}`)
    }
    return (

        <div className=' container'>
            <div className='display-product'>
                <div className='container-product d-flex justify-content-center flex-wrap row '>
                    {products.map((item, index) => {
                        return (
                            <div className='product-content col-6 col-sm-4 d-flex flex-column text-center' key={`product-${index}`}>
                                <div className='product-information'>
                                    <div className='product-detail' onClick={() => { handleGetDetailsProduct(item) }}>
                                        <img src={`${item?.images[0]}`} alt='' />
                                        <div className='product-name'>{item.title}</div>
                                    </div>
                                    <div className='product-price'>
                                        <div className={`${item.discount !== 0 ? "price-sale d-inline-block" : ""}`}>{item.discount !== 0 ? `${formatCurrency(item.price * (1 - item.discount / 100))}đ` : ""}</div>
                                        <div className={`${item.discount !== 0 ? "price-real d-inline" : "price"}`}>{formatCurrency(item.price)}</div>
                                        <button type='button' className='mt-2'>Thêm vào giỏ hàng</button>
                                    </div>
                                    {/* <label className='label-sold'>{item.status}</label> */}
                                    {/* {!item.status && item.sale && <label className='label-sale'>50%</label>} */}

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}

export default DisplayProduct;
