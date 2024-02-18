import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const navShopItems = [["Tab1", "tab1"], ["Tab2", "tab2"], ["Tab3", "tab3"]]

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);
    return (
        <>
            <div className='w-screen h-[60px] bg-main text-white px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center text-sm font-bold leading-6'>
                    <div className='flex items-center gap-5 '>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon="fa-solid fa-phone" /> <p>(225) 555-0118</p></div>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon="fa-regular fa-envelope" /> <p>michelle.rivera@example.com</p></div>
                    </div>
                    <p>Follow Us and get a chace to win 80% off</p>
                    <div className='flex items-center gap-3'>
                        <p>Follow Us : </p>
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                        <FontAwesomeIcon icon="fa-brands fa-youtube" />
                        <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        <FontAwesomeIcon icon="fa-brands fa-twitter" />
                    </div>
                </div>
            </div>
            <div className='w-screen h-[90px] px-5 text-gray'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center '>
                    <div className='flex items-center justify-between w-[50%]'>
                        <p className='font-bold text-2xl leading-8' >Bandage</p>
                        <nav className='flex gap-3 text-sm leading-6 items-center'>
                            <Link to="/">Home</Link>
                            <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle} className="text-sm text-secondary mr-[-8px]">
                                <DropdownToggle className="text-sm leading-6 border-0 text-gray flex items-center justify-between gap-2"><Link to="/shop">Shop</Link> <FontAwesomeIcon icon="fa-solid fa-angle-down" /></DropdownToggle>
                                <DropdownMenu className="min-w-[200px]">
                                    <DropdownItem header>Shop</DropdownItem>
                                    {navShopItems.map((item, index) => {
                                        return <Link to={"/shop/" + item[1]} key={index}><DropdownItem name={item[1]}>{item[0]}</DropdownItem></Link>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            <Link to="/about">About</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>
                    <div className='flex gap-5 text-sm leading-6 text-primary-blue'>
                        <a><FontAwesomeIcon icon="fa-regular fa-user" /> Login / Register</a>
                        <div><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></div>
                        <div><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> 1</div>
                        <div><FontAwesomeIcon icon="fa-regular fa-heart" /> 1</div>
                    </div>
                </div>
            </div>
        </>
    )
}