import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { apiAddToCart } from "../service/userApiService";
import Cookies from "js-cookie"
import { getCurrent } from "../redux/userSlice";
import { getCartFromCookies } from "../redux/cartSlice";
import { apiRemoveFromCart } from "../service/userApiService";
import { toast } from "react-toastify";
export const formatCurrency = (amount) => {
    if (!amount) return
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const renderStarFromNumber = (number) => {
    //3.3
    const integerPart = Math.floor(number); //3
    const decimalPart = number - integerPart; //0.3
    //ví dụ 3.3 => [1,1,1,0.3,0] => 3.3 sao
    const stars = [];
    for (let i = 0; i < integerPart; i++) stars.push(<FaStar style={{ marginTop: "-5px", color: '#ee4d2d' }} key={`star-${i}`} />) //[1,1,1,0,0]
    if (decimalPart > 0) stars.push(<FaStarHalfAlt style={{ marginTop: "-5px", color: '#ee4d2d' }} key={`part-star`} />) //[1,1,1,0.3,0]
    while (stars.length < 5) {
        stars.push(<FaRegStar style={{ marginTop: "-5px", color: '#ee4d2d' }} key={`no-star-${stars.length}`} />)   //[1,1,1,0.3,0]
    }
    return stars
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const addToCart = async (dispatch, isLoggedIn, product, color, size, quantity) => {
    if (isLoggedIn) {
        console.log("price", product.price)
        const addToCart = await apiAddToCart({
            pid: product._id,
            color: color,
            size: size,
            quantity: quantity,
            price: product.price
        })
        if (addToCart && addToCart.EC === 0) {
            dispatch(getCurrent())
            toast.success("Cập nhật giỏ hàng thành công!")
        }
    }
    // Người dùng chưa đăng nhập
    else {
        // Lấy dữ liệu giỏ hàng hiện tại từ cookies
        let cart = Cookies.get("PRODUCT_CART_NEW");
        if (cart) {
            // Nếu cookie đã có dữ liệu, giải mã nó
            cart = JSON.parse(cart);
        } else {
            // Nếu không có dữ liệu, khởi tạo giỏ hàng rỗng
            cart = {};
        }
        const productKey = `${product._id}-${color}-${size}`;

        // Thêm sản phẩm vào giỏ hàng
        if (cart[productKey]) {
            cart[productKey] = {
                product: {
                    title: product.title,
                    images: product?.options?.find(option => option.color === color)?.images[0] || product.images,
                    slug: product.slug,
                    _id: product._id
                },
                _id: productKey,
                quantity: +quantity + cart[productKey].quantity,
                color: color,
                size: size,
                price: product.price
            }
        }
        else {
            // Thêm sản phẩm mới vào giỏ hàng
            cart[productKey] = {
                product: {
                    title: product.title,
                    images: product?.options?.find(option => option.color === color)?.images[0] || product.images,
                    slug: product.slug,
                    _id: product._id
                },
                _id: `${product._id}-${color}-${size}`,
                quantity,
                price: product.price,
                color,
                size,
            };
        }
        // Cập nhật lại cookies sau khi thêm vào giỏ hàng
        Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cart), { expires: 30 });
        // Cập nhật Redux state (nếu cần)
        dispatch(getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) }));
        toast.success("Cập nhật giỏ hàng thành công!")
    }
}


export const hanldeDeleteCartItem = async (dispatch, isLoggedIn, cartItem, displayCart) => {
    if (isLoggedIn) {
        const removeItem = await apiRemoveFromCart({ pid: cartItem.product._id, color: cartItem.color, size: cartItem.size })
        if (removeItem.EC === 0) {
            dispatch(getCurrent());
        }
        return
    }
    else {
        //copy lại mảng cart
        let cartCopy = [...displayCart];
        //lọc ra những item khác vs item bị xóa
        cartCopy = cartCopy.filter(item => !(item._id === cartItem._id && item.color === cartItem.color && item.size === cartItem.size));
        //chuyển từ mảng về object
        const cartCookies = { ...cartCopy }
        //set lại cookies sau khi xóa
        Cookies.set("PRODUCT_CART_NEW", JSON.stringify(cartCookies), { expires: 30 });
        //dispatch để cập nhật lạ redux
        dispatch(getCartFromCookies({ cart: JSON.parse(Cookies.get("PRODUCT_CART_NEW")) }))
    }
}