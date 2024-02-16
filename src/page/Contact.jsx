import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactCard from '../components/ContactCard'
import { contactCardData } from '../mock/contactCardData'

export default function Contact() {

    return (
        <>
            <section className="w-screen">
                <div className="max-w-page-content mx-auto flex justify-between items-center">
                    <div className="flex flex-col gap-[35px] max-w-[400px]">
                        <h4 className="font-bold leading-6 text-main">CONTACT US</h4>
                        <h1 className="font-bold text-6xl leading-20 text-main">Get in touch
                            today!</h1>
                        <p className="text-gray text-xl leading-7.5 max-w-[376px]">We know how large objects will act, but things on a small scale</p>
                        <div className="text-main font-bold text-2xl leading-8 flex flex-col gap-5">
                            <p>Phone: +451 215 215 </p>
                            <p>Fax: +451 215 215</p>
                        </div>
                        <div className='flex gap-[34px] text-[30px] text-main'>
                            <FontAwesomeIcon icon="fa-brands fa-twitter" />
                            <FontAwesomeIcon icon="fa-brands fa-facebook" />
                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                        </div>
                    </div>
                    <div>
                        <img src="./img/contact-hero.svg" className="min-w-[632px] min-h-[612px] mr-[-128px]" />
                    </div>
                </div>
            </section>


            <section className='w-screen'>
                <div className='max-w-page-content mx-auto flex flex-col items-center py-[112px] gap-20'>
                    <div className='text-main text-center flex flex-col gap-2.5 '>
                        <h3 className='text-sm leading-5'>VISIT OUR OFFICE</h3>
                        <h2 className='font-bold text-[40px] leading-[50px] max-w-[555px]'>We help small businesses
                            with big ideas</h2>
                    </div>
                    <div className='flex'>
                        {contactCardData.map((item, index) => {
                            return <ContactCard key={index} data={item} index={index} />
                        })}
                    </div>
                </div>
            </section>

            <section className='w-screen'>
                <div className='max-w-page-content mx-auto flex flex-col items-center font-bold text-main py-20 relative gap-4'>
                    <img className='absolute left-[45%] top-[-15px]' src="./img/contact-arrow.svg" />
                    <h3 className='leading-6'>WE Can&apos;t WAIT TO MEET YOU</h3>
                    <h2 className='text-6xl leading-20'>Let’s Talk</h2>
                    <div>
                        <button className='text-white text-sm leading-[22px] bg-primary-blue rounded px-10 py-4'>Try it free now</button>
                    </div>
                </div>
            </section>
        </>
    )
}