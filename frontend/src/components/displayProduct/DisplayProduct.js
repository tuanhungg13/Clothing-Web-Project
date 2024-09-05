import React, { useEffect, useState } from 'react';
import "./DisplayProduct.scss";
import { formatCurrency } from "../../untils/helpers";
import { useNavigate } from 'react-router-dom';
const DisplayProduct = (props) => {
    const [products, setProducts] = useState([])
    const navigation = useNavigate();
    useEffect(() => {
        setProducts(props.productList)
    }, [props.productList])
    const handleGetDetailsProduct = (item) => {
        navigation(`/products/${item.slug}`)
    }
    return (

        <div className=' container'>
            <div className='display-product'>
                <div className='container-product d-flex justify-content-center flex-wrap row '>
                    {products && products.length > 0 && products.map((item, index) => {
                        return (
                            <div className='product-content col-6 col-sm-4 d-flex flex-column text-center' key={`product-${index}`}>
                                <div className='product-information'>
                                    <div className='product-detail' onClick={() => { handleGetDetailsProduct(item) }}>
                                        <img src={`${item?.options[0]?.images[0]}`} alt='' />
                                        <div className='product-name mt-sm-2' style={{ height: "40px" }}>{item.title}</div>
                                    </div>
                                    <div className='product-price'>
                                        <div className={`${item.discount !== 0 ? "price-sale d-inline-block" : ""}`}>{item.discount !== 0 ? `${formatCurrency(item.price * (1 - item.discount / 100))}đ` : ""}</div>
                                        <div className={`${item.discount !== 0 ? "price-real d-inline" : "price"}`}>{formatCurrency(item.price)}</div>
                                        <button type='button' className='mt-2'>Thêm vào giỏ hàng</button>
                                    </div>
                                    {item.stock === 0 && <label className='label-sold'>Hết hàng</label>}
                                    {item.discount !== 0 && item.quantity !== 0 && <label className='label-sale'>-{item.discount}%</label>}

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
