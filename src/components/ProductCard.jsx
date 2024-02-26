import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function ProductCard({ data, size }) {
    const categories = useSelector(store => store.global.categories);
    let link = "/";
    for (const cat of categories) {
        if (data.category_id === cat.id) {
            link += cat.code.slice(2) + "/" + data.id + "/" + data.name.toLowerCase().trim().replaceAll(" ", "-") + "/"
            break;
        }
    }

    return (
        <Link to={link} className="flex flex-col border items-center w-[240px] sm:w-[80%]">
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
            </div>
        </Link>

    )
}