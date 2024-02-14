import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faUser, faHeart, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export default function Header() {

    return (
        <>
            <div className='w-screen h-[60px] bg-[#252B42] text-white px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center text-sm font-bold leading-6'>
                    <div className='flex items-center gap-5 '>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon={faPhone} /> <p>(225) 555-0118</p></div>
                        <div className='flex items-center gap-1'><FontAwesomeIcon icon={faEnvelope} /> <p>michelle.rivera@example.com</p></div>
                    </div>
                    <p>Follow Us and get a chace to win 80% off</p>
                    <div className='flex items-center gap-3'>
                        <p>Follow Us : </p>
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
            </div>
            <div className='w-screen h-[90px] px-5'>
                <div className='max-w-[1500px] flex justify-between my-0 mx-auto h-full items-center '>
                    <div className='flex items-center justify-between w-[50%]'>
                        <p className='font-bold text-2xl leading-8' >Bandage</p>
                        <nav className='flex gap-3 text-sm leading-6 '>
                            <Link to="/">Home</Link>
                            <Link to="/shop">Shop</Link>
                            <Link to="/">About</Link>
                            <Link to="/">Blog</Link>
                            <Link to="/">Contact</Link>
                            <Link to="/">Pages</Link>
                        </nav>
                    </div>
                    <div className='flex gap-5 text-sm leading-6 text-[#23A6F0]'>
                        <a><FontAwesomeIcon icon={faUser} /> Login / Register</a>
                        <div><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                        <div><FontAwesomeIcon icon={faCartShopping} /> 1</div>
                        <div><FontAwesomeIcon icon={faHeart} /> 1</div>
                    </div>
                </div>
            </div>
        </>
    )
}