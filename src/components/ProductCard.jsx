import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../store/actions/ShoppingCartActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({ data, size }) {
    const categories = useSelector(store => store.global.categories);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleCart = () => {
        dispatch(addToCartAction(data))
    }

    let link = "/";
    let categoryName = "";
    for (const cat of categories) {
        if (data.category_id === cat.id) {
            categoryName = cat.title;
            link += cat.code.slice(2) + "/" + data.id + "/" + data.name.toLowerCase().trim().replaceAll(" ", "-") + "/"
            break;
        }
    }
    return (
        <div className="flex flex-col items-center flex-grow-1 basis-[240px] border-[1px] border-muted-text-color rounded-[16px]">
            <img onClick={() => history.push(link)} src={data.images[0].url} className={`w-full border-b-1 border-muted-text-color rounded-t-[16px] rounded-b-none aspect-square sm:h-max object-cover object-center cursor-pointer`} />
            <div className="flex flex-col items-center pt-2 h-full gap-2 w-full">
                <h4 className="text-main text-base font-bold">{data.name}</h4>
                <p className="text-gray text-sm font-bold  text-center">{categoryName}</p>
                <p className="text-gray text-base font-bold">${data.price}</p>
                <div className="w-full flex text-white rounded-b-[16px] rounded-t-none">
                    <button onClick={() => history.push(link)} className="px-3 py-2 w-[50%] bg-primary-blue rounded-bl-[16px]"><FontAwesomeIcon icon="fa-solid fa-arrow-right" /> Details</button>
                    <button onClick={handleCart} className="px-3 py-2 w-[50%] bg-black rounded-br-[16px]"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart</button>
                </div>
            </div>
        </div>
    )
}