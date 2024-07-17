import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";




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
    for (let i = 0; i < integerPart; i++) stars.push(<FaStar style={{ marginTop: "-5px", color: '#ee4d2d' }} />) //[1,1,1,0,0]
    if (decimalPart > 0) stars.push(<FaStarHalfAlt style={{ marginTop: "-5px", color: '#ee4d2d' }} />) //[1,1,1,0.3,0]
    while (stars.length < 5) {
        stars.push(<FaRegStar style={{ marginTop: "-5px", color: '#ee4d2d' }} />)   //[1,1,1,0.3,0]
    }
    return stars
} 