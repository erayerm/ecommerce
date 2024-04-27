import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../store/actions/ShoppingCartActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductCard({ data, size }) {
    const categories = useSelector(store => store.global.categories);
    const cart = useSelector(store => store.shoppingCart.cart)
    const dispatch = useDispatch();
    const history = useHistory();

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
        <div className="flex flex-col border items-center flex-grow-1 basis-[240px]">
            <img onClick={() => history.push(link)} src={data.images[0].url} className={`w-full border sm:aspect-[34/42] sm:h-max h-[${size[1]}px] object-cover object-center cursor-pointer`} />
            <div className="flex flex-col items-center gap-3.5 pt-6 mb-7 h-full justify-between">
                <h4 className="text-main text-base font-bold leading-6">{data.name}</h4>
                <p className="text-gray text-sm font-bold leading-6 text-center">{data.description}</p>
                <div className="flex gap-1.5">
                    <p className="text-gray text-base font-bold leading-6">${data.price}</p>
                    <p className="text-dark-green text-base font-bold leading-6">$6.84{/*data.priceDiscounted*/}</p>
                </div>
                <button onClick={handleCart} className="rounded px-3 py-2 bg-[#468080] text-white">Sepete Ekle</button>
            </div>
        </div>
    )
}