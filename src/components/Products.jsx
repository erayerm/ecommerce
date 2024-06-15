import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from "reactstrap"
import ProductCard from "./ProductCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setLoadingAction } from "../store/actions/ProductActions";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const navItems = [["Default", ""], ["Price Low to High", "price:asc"], ["Price High to Low", "price:desc"], ["Rating Low to High", "rating:asc"], ["Rating High to Low", "rating:desc"]]

export default function Products({ genderParams = null, categoryParams = null }) {
    const search = useLocation().search;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPick, setDropdownPick] = useState(new URLSearchParams(search).get('sort') ? navItems[navItems.findIndex(item => item[1] === new URLSearchParams(search).get('sort'))][0] : "Order By");
    const [category, setCategory] = useState(null);
    const [filter, setFilter] = useState(new URLSearchParams(search).get('filter'));
    const [sort, setSort] = useState(new URLSearchParams(search).get('sort'));
    const limit = 24;
    const [offset, setOffset] = useState(new URLSearchParams(search).get('offset'));
    const [canFetch, setCanFetch] = useState(genderParams ? false : true)
    const [filterText, setFilterText] = useState(new URLSearchParams(search).get('filter') ? new URLSearchParams(search).get('filter') : "");
    const [pageCount, setPageCount] = useState(0);
    const [prevOffset, setPrevOffset] = useState(0);
    const paginateRef = useRef(null);
    const beginningRef = useRef(null);

    const productsLoading = useSelector(store => store.productStore.loading);
    const products = useSelector(store => store.productStore.product);
    const productCount = useSelector(store => store.productStore.productCount);
    const categories = useSelector(store => store.global.categories)

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);

    const handlePageClick = (event) => {
        const newOffset = event.selected * limit % productCount;
        setOffset(newOffset);
        beginningRef.current.scrollIntoView({ behavior: 'instant' });
    };

    const handleChange = (element) => {
        setFilterText(element.target.value);
    }

    const handleFilter = () => {
        setFilter(filterText);
    }

    const cleanFilter = () => {
        setFilterText("");
        setFilter("");
    }
    function handleKeyPress(event) {
        if (event.key == 'Enter') {
            handleFilter();
        }
    }
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
        if (categoryParams === null && genderParams === null) {
            setCategory(null);
            setFilter(null);
            setOffset(0);
            setSort(null);
        } else {
            for (const cat of categories) {
                if (genderParams) {
                    if (genderParams[0] + ":" + categoryParams == cat.code) {
                        setCategory(cat.id);
                        break;
                    }
                }
            }
        }
        setCanFetch(true);
    }, [categories, categoryParams, genderParams])


    useEffect(() => {
        if (prevOffset !== offset) {
            if (canFetch || (offset !== 0 && offset !== null)) dispatch(fetchProducts(category, filter, sort, limit, offset))
            history.push(location.pathname + "?" + (filter ? "filter=" + filter + "&" : "") + (sort ? "sort=" + sort + "&" : "") + ("offset=" + offset))
            setPrevOffset(offset);
            setCanFetch(true);
        } else {
            paginateRef.current ? paginateRef.current.state.selected = 0 : "";
            if (canFetch) dispatch(fetchProducts(category, filter, sort, limit, 0))
            if (canFetch) history.push(location.pathname + "?" + (filter ? "filter=" + filter + "&" : "") + (sort ? "sort=" + sort + "&" : "") + ("offset=" + 0))
            setCanFetch(true);
            setOffset(0);
        }
        dispatch(setLoadingAction(true))
    }, [category, filter, sort, offset])

    useEffect(() => {
        setPageCount(Math.ceil(productCount / limit));
    }, [category, filter, sort, offset, productCount])

    return (
        <div className="w-screen flex flex-col" ref={beginningRef}>
            <div className="my-0 mx-auto max-w-[1060px]">
                <div className="w-full gap-20 flex md:flex-col md:gap-6 justify-between items-center py-6 px-2">
                    <p className="text-gray font-bold text-sm leading-6">Showing all {productCount} results</p>
                    <div className="flex gap-3.5 flex-wrap justify-center">
                        <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle} className="text-sm leading-7 text-secondary rounded ">
                            <DropdownToggle className="pl-3 py-2.5 border-1 text-gray border-[#DDDDDD] rounded hover:bg-gray-300 hover:text-black flex items-center justify-between min-w-[200px] gap-2"><p>{dropdownPick}</p> <FontAwesomeIcon icon="fa-solid fa-angle-down" /></DropdownToggle>
                            <DropdownMenu className="min-w-[200px]">
                                {navItems.map((item, index) => {
                                    return <DropdownItem onClick={handleSort} name={item[1]} key={index}>{item[0]}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <div className="relative">
                                <input type="text" onKeyDown={handleKeyPress} onChange={handleChange} value={filterText} className="border border-[#DDDDDD] rounded pl-3 py-2.5" />
                                <button onClick={cleanFilter} className="absolute right-3 top-0 bottom-0 my-auto"><FontAwesomeIcon className="text-gray" icon="fa-solid fa-xmark" /></button>
                            </div>
                            <button onClick={handleFilter} className="px-5 py-2.5 text-white bg-primary-blue rounded">Filter</button>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-center items-center h-[500px] " + (productsLoading ? "block" : "hidden")}><Spinner className="w-[100px] h-[100px]">Loading...</Spinner></div>
                {products.length == 0 ? <p className="w-full text-center text-2xl pt-12 font-bold">Product Not Founded!</p> :
                    <>
                        <div className={"flex flex-wrap gap-x-7 gap-y-20 justify-center px-2 py-12 " + (productsLoading ? "hidden" : "block")}>
                            {products.map((item, index) => {
                                return <ProductCard key={index} data={item} size={[240, 300]} />
                            })}
                        </div>
                        <div className={"flex justify-center pb-5 " + (productsLoading ? "hidden" : "block")}>
                            <ReactPaginate
                                ref={paginateRef}
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< Previous"
                                pageClassName="page-item text-main"
                                pageLinkClassName="page-link text-main"
                                previousClassName="page-item text-main"
                                previousLinkClassName="page-link text-main"
                                nextClassName="page-item text-main"
                                nextLinkClassName="page-link text-main"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}