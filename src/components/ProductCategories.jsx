import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { categoriesData } from "../mock/categoriesData";
import ProductCategoriesCard from "./ProductCategoriesCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useState } from "react";

export default function ProductCategories() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const categories = useSelector(store => store.global.categories);

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);

    return (
        <div className="w-screen bg-[rgb(250,250,250)]">
            <div className="max-w-[1050px] mx-auto px-2 flex items-center justify-between pt-6">
                <h1 className="font-bold text-2xl leading-8 text-main">Shop</h1>
                <div className="flex items-center gap-3.5 font-bold text-sm leading-6">
                    <Link to="/" className="text-main">Home</Link>
                    <p className="text-muted-text-color font-thin text-4xl">{">"}</p>
                    <p className="text-muted-text-color">Shop</p>
                </div>
            </div>
            <div className="max-w-[1088px] mx-auto my-0 px-0.5">
                <div className="flex justify-end py-4">
                    <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle} className="text-sm text-secondary mr-[-8px]">
                        <DropdownToggle className="py-2.5border-1 text-gray border-[#DDDDDD] rounded hover:bg-gray-300 hover:text-black flex items-center justify-between min-w-[200px] gap-2">See All Categories<FontAwesomeIcon icon="fa-solid fa-angle-down" /></DropdownToggle>
                        <DropdownMenu className="min-w-[200px]">
                            <DropdownItem header className="text-lg font-bold">Kadın</DropdownItem>
                            {categories.map((item, index) => {
                                const gender = item.gender === "k" ? "kadin" : "erkek";
                                const itemCode = item["code"].split("").slice(2).join("");
                                if (item.gender === "k") return <Link to={"/shop/" + gender + "/" + itemCode} key={index}><DropdownItem name={item.code} className='text-sm'>{item.title}</DropdownItem></Link>
                            })}
                            <DropdownItem header className="text-lg font-bold">Erkek</DropdownItem>
                            {categories.map((item, index) => {
                                const gender = item.gender === "k" ? "kadin" : "erkek";
                                const itemCode = item["code"].split("").slice(2).join("");
                                if (item.gender === "e") return <Link to={"/shop/" + gender + "/" + itemCode} key={index}><DropdownItem name={item.code} className='text-sm'>{item.title}</DropdownItem></Link>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex flex-wrap gap-3.5 items-center justify-center pb-12">
                    {categories.sort((a, b) => b["rating"] - a["rating"]).slice(0, 5).map((item, index) => {
                        return <ProductCategoriesCard key={index} data={item} />
                    })}
                </div>
            </div>
        </div>
    )
}
