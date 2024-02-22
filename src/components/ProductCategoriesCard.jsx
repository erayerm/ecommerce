import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function ProductCategoriesCard({ data }) {
    const gender = data.gender === "k" ? "kadin" : "erkek";
    const itemCode = data["code"].split("").slice(2).join("");

    return (

        <Link to={"/shop/" + gender + "/" + itemCode} className={`w-[205px] sm:w-[80%] bg-cover bg-center aspect-square flex flex-col gap-2.5 justify-center items-center text-white grayscale-[60%]`} style={{
            backgroundImage: `url(${data.img})`,
            textShadow: "1px 1px 2px black"
        }}>
            <h4 className="font-bold leading-6">{data.gender === "k" ? "Kadın - " : "Erkek - "}{data.title}</h4>
            <p className="text-sm leading-5">{data.id} Items</p>
        </Link>
    )
}