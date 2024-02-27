import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCartAction, removeFromCartAction, toggleCheckAction } from "../store/actions/ShoppingCartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mui/material";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ShoppingCart() {
    const cart = useSelector(store => store.shoppingCart.cart);
    const dispatch = useDispatch()

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
    return (
        <>
            <div className="w-screen">
                <div className="flex max-w-[1450px] mx-auto">
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
                    <div className="basis-[40%] bg-primary-blue">

                    </div>
                </div>

            </div>
        </>
    )
}