import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { addToCartAction, removeFromCartAction } from '../store/actions/ShoppingCartActions';
import { fetchProducts } from '../store/actions/ProductActions';

const navShopItems = [["Tab1", "tab1"], ["Tab2", "tab2"], ["Tab3", "tab3"]]

export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const user = useSelector(store => store.user.user);
    const categories = useSelector(store => store.global.categories);
    const cart = useSelector(store => store.shoppingCart.cart);

    const dispatch = useDispatch()

    const handleToggle = () => setDropdownOpen(!dropdownOpen);
    const handleCartToggle = () => setCartOpen(!cartOpen);

    const handleHoverIn = () => setDropdownOpen(true);
    const handleHoverOut = () => setDropdownOpen(false);

    const [pagesMenuOpen, setPagesMenuOpen] = useState(false);

    const handleClick = () => {
        setPagesMenuOpen(!pagesMenuOpen);
    }
    const handleCart = (id, type) => {
        for (const product of cart) {
            if (product.product.id == id) {
                if (type === "add") {
                    dispatch(addToCartAction(product.product))
                } else {
                    dispatch(removeFromCartAction(product.product));
                }
                break;
            }
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <>
            <div className='w-screen h-[60px] bg-main text-white px-5 lg:hidden'>
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
            <div className='w-screen py-[30px] px-5 text-gray'>
                <div className='max-w-[1440px] flex justify-between my-0 mx-auto h-full items-center '>
                    <div className='flex items-center gap-5'>
                        <p className='font-bold text-2xl leading-8 text-main' >Bandage</p>
                        <nav className='flex gap-3 text-sm leading-6 items-center lg:hidden'>
                            <Link to="/">Home</Link>
                            <Dropdown onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} isOpen={dropdownOpen} toggle={handleToggle} className="text-sm text-secondary mr-[-8px]">
                                <DropdownToggle className="text-sm leading-6 border-0 text-gray flex items-center justify-between gap-2"><Link to="/shop">Shop</Link> <FontAwesomeIcon icon="fa-solid fa-angle-down" /></DropdownToggle>
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
                            <Link to="/about">About</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>
                    <div className='flex gap-4 text-sm leading-6 text-main'>
                        {Object.keys(user).length !== 0 ? <div className='flex gap-2 items-center'><img className='w-[35px] aspect-square' src={user.img} /><p className='text-main text-sm'>{user.name}</p></div> : <Link to="/signup"><FontAwesomeIcon icon="fa-regular fa-user" /> <span className='md:hidden'>Login / Register</span></Link>}
                        <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                        <button><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> 1</button>
                        <Dropdown isOpen={cartOpen} toggle={handleCartToggle} className="text-sm text-secondary mr-[-8px]">
                            <DropdownToggle className="text-sm leading-6 border-0 text-gray flex items-center justify-between gap-2"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> {cart.length}</DropdownToggle>
                            <DropdownMenu className="w-[500px]">
                                <DropdownItem header className="text-lg font-bold">Sepetim</DropdownItem>
                                {cart.map((item, index) => {
                                    return <div key={index} className={'flex justify-between p-2 ' + (index % 2 === 0 ? "bg-light-gray-1" : "")}>
                                        <div className='flex gap-2 items-center'>
                                            <div className='w-[20%] aspect-square' >
                                                <img className='size-full object-cover object-center' src={item.product.images[0].url} />
                                            </div>
                                            <div className='max-w-[60%]'>
                                                <p className='text-main'>{item.product.name}</p>
                                                <p className='text-sm text-muted-text-color line-clamp-2'>{item.product.description}</p>
                                            </div>
                                        </div>
                                        <div className='self-center flex flex-col items-center px-4 py-2 bg-white border rounded'>
                                            <button onClick={() => handleCart(item.product.id, "add")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-up" /></button>
                                            <p>{item.count}</p>
                                            <button onClick={() => handleCart(item.product.id, "remove")}><FontAwesomeIcon name={"" + item.product.id} icon="fa-solid fa-angle-down" /></button>
                                        </div>
                                    </div>
                                })}
                                <div className='flex justify-end py-4 px-2'>
                                    <button className='bg-primary-blue text-white py-3 px-4 rounded'>Sepete Git</button>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                        <button className='md:hidden'><FontAwesomeIcon icon="fa-regular fa-heart" /> 1</button>
                        <button className='hidden lg:block' onClick={handleClick}><FontAwesomeIcon icon="fa-solid fa-bars" /></button>
                    </div>
                </div>
                {pagesMenuOpen && <div className=''> {/* transition */}
                    <nav className='flex-col pt-[90px] pb-[70px] gap-3 text-[30px] leading-11 items-center justify-center text-center hidden lg:block'>
                        <div> <Link to="/">Home</Link></div>
                        <div> <Link to="/shop">Shop</Link></div>
                        <div> <Link to="/about">About</Link></div>
                        <div> <Link to="/team">Team</Link></div>
                        <div> <Link to="/contact">Contact</Link></div>
                        <div> <Link to="/">Pages</Link></div>
                    </nav>
                </div>
                }
            </div>
        </>
    )
}