import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import { bestseller } from "../mock/bestSellerData"
import ProductCard from "./ProductCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

const navItems = [["Price Low to High", "lth"], ["Price High to Low", "htl"], ["Popularity", "pop"]]

export default function Products() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPick, setDropdownPick] = useState("Popularity");

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);
    const handlePick = (element) => {
        for (const item of navItems) {
            if (item[1] === element.target.name) {
                setDropdownPick(item[0]);
                break;
            }
        }
    }

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
                                <DropdownItem header>Order By</DropdownItem>
                                {navItems.map((item, index) => {
                                    return <DropdownItem onClick={handlePick} name={item[1]} key={index}>{item[0]}</DropdownItem>
                                })}
                            </DropdownMenu>
                        </Dropdown>
                        <button className="px-5 py-2.5 text-white bg-primary-blue rounded">Filter</button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-7 gap-y-20 justify-center py-12">
                    {bestseller.map((item, index) => {
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
            </div>
        </div>
    )
}