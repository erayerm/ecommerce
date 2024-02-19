import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Footer() {
    return (
        <div className="w-screen text-main">
            <div className="max-w-page-content flex md:flex-col md:gap-10  flex-wrap justify-between mx-auto my-0 pt-20 pb-20 pl-5">
                <div className="w-[250px]">
                    <h3 className='footer-titles'>Get In Touch</h3>
                    <p className='text-gray'>The quick fox jumps over the lazy dog</p>
                    <div className='flex gap-5 pt-5 text-[24px] text-primary-blue '>
                        <FontAwesomeIcon icon="fa-brands fa-facebook" />
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                        <FontAwesomeIcon icon="fa-brands fa-twitter" />
                    </div>
                </div>
                <div className='flex md:flex-col md:gap-10 flex-wrap'>
                    <div className="w-[250px]">
                        <h3 className='footer-titles'>Company info</h3>
                        <ul className='flex flex-col gap-2 text-gray'>
                            <li>About Us</li>
                            <li>Carrier</li>
                            <li>We are hiring</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="w-[250px]">
                        <h3 className='footer-titles'>Features</h3>
                        <ul className='flex flex-col gap-2 text-gray'>
                            <li>Bussiness Marketing</li>
                            <li>User Analytic</li>
                            <li>Live Chat</li>
                            <li>Unlimited Support</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center text-center py-3 text-sm text-gray leading-6 font-bold bg-light-gray-1'>Made With Love By Figmaland All Right Reserved</div>
        </div>
    )
}