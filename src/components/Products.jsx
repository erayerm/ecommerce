import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from "reactstrap"
import { bestseller } from "../mock/bestSellerData"
import ProductCard from "./ProductCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setLoadingAction } from "../store/actions/ProductActions";

const navItems = [["Default", ""], ["Price Low to High", "price:asc"], ["Price High to Low", "price:desc"], ["Rating Low to High", "rating:asc"], ["Rating High to Low", "rating:desc"]]

export default function Products({ genderParams = "", categoryParams = "" }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPick, setDropdownPick] = useState("Order By");
    const [category, setCategory] = useState("");
    const [filter, setFilter] = useState(""); //input?
    const [sort, setSort] = useState("");

    const productsLoading = useSelector(store => store.productStore.loading);
    const products = useSelector(store => store.productStore.product);
    const categories = useSelector(store => store.global.categories)

    const dispatch = useDispatch();

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);

    const handleSort = async (element) => {
        for (const item of navItems) {
            if (item[1] === element.target.name) {
                setDropdownPick(item[0]);
                dispatch(setLoadingAction(true));
                setSort(item[1])
                break;
            }
        }
    }

    useEffect(() => {
        console.log(categories)
        for (const cat of categories) {
            if (genderParams) {
                console.log(genderParams[0] + ":" + categoryParams + " " + cat.code);
                if (genderParams[0] + ":" + categoryParams == cat.code) {
                    setCategory(cat.id);
                    break;
                }
            }
        }
    }, [categories, categoryParams])

    useEffect(() => {
        console.log(categoryParams);
        console.log(category)
        dispatch(fetchProducts(category, filter, sort))
    }, [category, filter, sort])


    return (
        <div className="w-screen flex flex-col">
            <div className="my-0 mx-auto max-w-page-content">
                <div className="flex md:flex-col md:gap-6 justify-between items-center py-6">
                    <p className="text-gray font-bold text-sm leading-6">Showing all X! results</p>
                    <div className="flex items-center gap-3.5">
                        <p className="text-gray font-bold text-sm leading-6">Views: </p>
                        <button className="h-[46px] w-[46px] border-1 rounded"><FontAwesomeIcon icon="fa-solid fa-border-all" /></button>
                        <button className="h-[46px] w-[46px] border-1 rounded"><FontAwesomeIcon icon="fa-solid fa-list-check" /></button>
                    </div>
                    <div className="flex gap-3.5 flex-wrap justify-center">
                        <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle} className="text-sm leading-7 text-secondary rounded ">
                            <DropdownToggle className="pl-3 py-2.5 border-1 text-gray border-[#DDDDDD] rounded hover:bg-gray-300 hover:text-black flex items-center justify-between min-w-[200px] gap-2"><p>{dropdownPick}</p> <FontAwesomeIcon icon="fa-solid fa-angle-down" /></DropdownToggle>
                            <DropdownMenu className="min-w-[200px]">
                                {navItems.map((item, index) => {
                                    return <DropdownItem onClick={handleSort} name={item[1]} key={index}>{item[0]}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <button className="px-5 py-2.5 text-white bg-primary-blue rounded">Filter</button>
                    </div>
                </div>
                {productsLoading
                    ? <div className="flex justify-center items-center h-[500px]"><Spinner className="w-[100px] h-[100px]">Loading...</Spinner></div>
                    : <><div className="flex flex-wrap gap-x-7 gap-y-20 justify-center py-12">
                        {products.map((item, index) => {
                            return <ProductCard key={index} data={item} size={[240, 300]} />
                        })}
                    </div>
                        <div className="w-full flex justify-center pb-12">
                            <ButtonGroup className="me-2">
                                <Button color="light" size="lg" className="border-2 border-inherit" >
                                    First
                                </Button>
                                <Button color="light" size="lg" className="border-2 border-inherit">
                                    1
                                </Button>
                                <Button color="primary" size="lg" className="border-2 border-inherit"  >
                                    2
                                </Button>
                                <Button color="light" size="lg" className="border-2 border-inherit">
                                    3
                                </Button>
                                <Button color="light" size="lg" className="border-2 border-inherit">
                                    Next
                                </Button>
                            </ButtonGroup>
                        </div>
                    </>

                }


            </div>
        </div>
    )
}