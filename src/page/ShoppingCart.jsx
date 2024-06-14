import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCartAction, removeFromCartAction, toggleCheckAction } from "../store/actions/ShoppingCartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom";
import OrderSummary from "../components/OrderSummary";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ShoppingCart() {
    const cart = useSelector(store => store.shoppingCart.cart);
    const totalPriceProducts = cart.reduce((accumulator, currentValue) => {
        if (currentValue.checked) {
            return accumulator + currentValue.count * currentValue.product.price;
        }
        return accumulator;
    },
        0
    )
    const shippingPaymentPrice = 29.90;
    const shippingDiscountLimit = 150;
    const totalPriceAll = totalPriceProducts + shippingPaymentPrice - (totalPriceProducts >= shippingDiscountLimit ? shippingPaymentPrice : 0)

    const dispatch = useDispatch()
    const history = useHistory();

    const handleCart = (id, type) => {
        for (const product of cart) {
            if (product.product.id == id) {
                if (type === "add") {
                    dispatch(addToCartAction(product.product))
                } else if (type === "remove") {
                    dispatch(removeFromCartAction(product.product));
                } else {
                    dispatch(deleteFromCartAction(product.product))
                }
                break;
            }
        }
    }
    const handleCheck = (id) => {
        for (const product of cart) {
            if (product.product.id == id) {
                dispatch(toggleCheckAction(product.product));
                break;
            }
        }
    }
    const toFixed2 = (number) => {
        return (Math.round(number * 100) / 100).toFixed(2)
    }
    const handleGoBack = () => {
        if (history.action === 'POP') {
            history.push('/shop');
        } else {
            history.goBack();
        }
    }

    if (cart.length === 0) {
        return <div className="w-screen h-[40vh] flex flex-col justify-center items-center">
            <p className="text-3xl">Your Cart is Empty</p>
            <div>
                <button onClick={handleGoBack} className="bg-primary-blue py-3 px-5 rounded text-white text-2xl mt-3">Go Back</button>
            </div>
        </div>
    }

    return (
        <>
            <div className="w-screen pt-3">
                <div className="flex max-w-[1450px] mx-auto lg:flex-col lg:gap-10">
                    <div className="basis-[60%]">
                        {cart.map((item, index) => {
                            return <div key={index} className={'flex justify-between py-2 pl-8 pr-8 sm:pr-4 sm:pl-2 gap-1 ' + (index % 2 === 0 ? "bg-light-gray-1" : "")}>
                                <div className='flex-[3] flex items-center w-full gap-3 sm:gap-1'>
                                    <Checkbox className="flex-1 size-2" {...label} checked={item.checked} onClick={() => handleCheck(item.product.id)} />
                                    <div className='flex-[3] aspect-[3/4]' >
                                        <img className='min-w-[70px] w-full object-cover object-center sm:none' src={item.product.images[0].url} />
                                    </div>
                                    <div className="flex-[15]">
                                        <p className='text-main sm:text-[14px]'>{item.product.name}</p>
                                        <p className='text-sm sm:text-[12px] max-w-[350px] sm:max-w-[200px] text-muted-text-color line-clamp-2'>{item.product.description}</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-row justify-between gap-1">
                                    <div className="flex-1 flex items-center sm:text-[14px] min-w-[70px]">
                                        <p className=" w-full">{toFixed2(item.product.price * item.count)}$</p>
                                    </div>
                                    <div className="flex-1 justify-center flex flex-col items-center bg-white border rounded text-[14px] min-w-[60px] sm:min-w-[40px]">
                                        <button className="w-full" onClick={() => handleCart(item.product.id, "add")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-up" /></button>
                                        <p>{item.count}</p>
                                        <button className="w-full" onClick={() => handleCart(item.product.id, "remove")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-down" /></button>
                                    </div>
                                    <div className="flex-1 flex items-center min-w-[50px]">
                                        <button onClick={() => handleCart(item.product.id, "delete")} className="text-xl hover:text-[#800000] sm:text-[16px] w-full"><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                    </div>
                                </div>
                            </div>
                        })
                        }
                    </div>
                    <div className="basis-[40%]">
                        <OrderSummary />
                        <div className="px-10">
                            <button className="w-full border py-2 mt-4 rounded text-sm"><FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" /> Enter Discount Code</button>
                            <Link to="/createOrder">
                                <button className="w-full py-3 bg-primary-blue text-white mt-4 text-xl rounded text-center">Create Order</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}