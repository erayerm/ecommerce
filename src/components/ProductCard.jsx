import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { addToCartAction } from "../store/actions/ShoppingCartActions";

export default function ProductCard({ data, size }) {
    const categories = useSelector(store => store.global.categories);
    const cart = useSelector(store => store.shoppingCart.cart)
    const dispatch = useDispatch();
    const handleCart = () => {
        dispatch(addToCartAction(data))
    }

    let link = "/";
    for (const cat of categories) {
        if (data.category_id === cat.id) {
            link += cat.code.slice(2) + "/" + data.id + "/" + data.name.toLowerCase().trim().replaceAll(" ", "-") + "/"
            break;
        }
    }

    return (
        <div to={link} className="flex flex-col border items-center flex-grow-1 basis-[240px]">
            <img src={data.images[0].url} className={`w-full border sm:aspect-[34/42] sm:h-max h-[${size[1]}px] object-cover object-center`} />
            <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                <h4 className="text-main text-base font-bold leading-6">{data.name}</h4>
                <p className="text-gray text-sm font-bold leading-6 text-center">{data.description}</p>
                <div className="flex gap-1.5">
                    <p className="text-gray text-base font-bold leading-6">${data.price}</p>
                    <p className="text-dark-green text-base font-bold leading-6">$6.84{/*data.priceDiscounted*/}</p>
                </div>
                <div className="flex gap-1.5">
                    {/*data.colorOptions.map((item, index) => {
                        return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                    })*/}
                </div>
                <div className="flex gap-2 flex-col ">
                    <Link to={link} className="rounded px-3 py-2 bg-[#468080] text-white">Learn More</Link>
                    <button onClick={handleCart} className="rounded px-3 py-2 bg-[#468080] text-white">Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}