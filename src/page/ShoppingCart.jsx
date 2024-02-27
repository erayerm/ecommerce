import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCartAction, removeFromCartAction, toggleCheckAction } from "../store/actions/ShoppingCartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
                            return <div key={index} className={'flex justify-between py-2 pl-10 pr-10 ' + (index % 2 === 0 ? "bg-light-gray-1" : "")}>
                                <div className='flex items-center w-full gap-3'>
                                    <Checkbox {...label} checked={item.checked} onClick={() => handleCheck(item.product.id)} />
                                    <div className='w-[15%] aspect-[3/4]' >
                                        <img className='w-full h-full object-cover object-center' src={item.product.images[0].url} />
                                    </div>
                                    <div className='max-w-[60%]'>
                                        <p className='text-main'>{item.product.name}</p>
                                        <p className='text-sm text-muted-text-color line-clamp-2'>{item.product.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center pr-10">
                                    <p>{toFixed2(item.product.price * item.count)}$</p>
                                </div>
                                <div className='self-center flex flex-col items-center px-4 py-2 bg-white border rounded'>
                                    <button onClick={() => handleCart(item.product.id, "add")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-up" /></button>
                                    <p>{item.count}</p>
                                    <button onClick={() => handleCart(item.product.id, "remove")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-down" /></button>
                                </div>
                                <div className="flex items-center ml-10">
                                    <button onClick={() => handleCart(item.product.id, "delete")} className="text-xl hover:text-[#800000]"><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
                                </div>
                            </div>
                        })
                        }
                    </div>
                    <div className="basis-[40%] px-5 text-main">
                        <div className="w-full">
                            <h2 className="text-3xl">Order Summary</h2>
                            <div className="space-y-2 pt-4">
                                <div className="flex justify-between">
                                    <p>Total Price</p>
                                    <p>{toFixed2(totalPriceProducts)}$</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping Payment Price</p>
                                    <p>{toFixed2(shippingPaymentPrice)}$</p>
                                </div>
                                {totalPriceProducts > shippingDiscountLimit &&
                                    <div className="flex justify-between">
                                        <p>Shipping Discount</p>
                                        <p className="text-primary-blue">-{toFixed2(shippingPaymentPrice)}$</p>
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between text-xl pt-4">
                                <p>Total</p>
                                <p className="text-primary-blue">{toFixed2(totalPriceAll)}$</p>
                            </div>
                        </div>
                        <button className="w-full border py-2 mt-4 rounded text-sm"><FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" /> Enter Discount Code</button>
                        <button className="w-full py-3 bg-primary-blue text-white mt-4 text-xl rounded">Create Order</button>
                    </div>
                </div>

            </div>
        </>
    )
}