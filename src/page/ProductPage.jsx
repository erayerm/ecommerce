import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { thirdCarouselContent } from "../mock/carouselContentsData";
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductDetails from "../components/ProductDetails";
import Carousel from "../components/Carousel";
import { imageBasePath } from "../../public/imgBasePath";
import { bestseller } from "../mock/bestSellerData";
import ProductCardSecond from "../components/ProductCardSecond";
import Clients from "../components/Clients";

const colors = ["[#23A6F0]", "success-green", "[#E77C40]", "[#252B42]"];



export default function ProductPage() {
    const [currIndex, setCurrIndex] = useState(0);
    const [shownImages, setShownImages] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(() => {
        //change later
        if (currIndex === 0) {
            setShownImages(
                thirdCarouselContent.slice(currIndex, currIndex + 5)
            );
            setCarouselIndex(0);
        } else if (currIndex === thirdCarouselContent.length - 1) {
            setShownImages(
                thirdCarouselContent.slice(currIndex - 4, currIndex + 1)
            );
            setCarouselIndex(4);
        } else if (currIndex === thirdCarouselContent.length - 2) {
            setShownImages(
                thirdCarouselContent.slice(currIndex - 3, currIndex + 2)
            );
            setCarouselIndex(3);
        } else if (currIndex === thirdCarouselContent.length - 3) {
            setShownImages(
                thirdCarouselContent.slice(currIndex - 2, currIndex + 3)
            );
            setCarouselIndex(2);
        } else {
            setShownImages(
                thirdCarouselContent.slice(currIndex - 1, currIndex + 4)
            );
            setCarouselIndex(1)
        }
    }, [currIndex]);

    return (
        <>
            <section className="width-screen bg-light-gray-1">
                <div className="max-w-page-content mx-auto py-6">
                    <div className="flex items-center gap-3.5 font-bold text-sm leading-6">
                        <Link to="/" className="text-main">Home</Link>
                        <p className="text-muted-text-color font-thin text-4xl">{">"}</p>
                        <p className="text-muted-text-color">Shop</p>
                    </div>
                </div>
                <div className="max-w-page-content mx-auto flex gap-[30px] pb-12">
                    <div>
                        <div className="w-[506px] h-[450px]">
                            <Carousel slides={thirdCarouselContent} setCurrIndex={setCurrIndex} haveText={false} />
                        </div>
                        <div className="flex gap-[19px] pt-5">
                            {/* when the redux or useContext implemented I'm gonna add onClick on images*/}
                            {shownImages.map((item, index) => {
                                return <img className={"w-[100px] h-[75px] object-cover" + (carouselIndex !== index ? " opacity-60" : "")} key={index} src={item} />
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-4 px-6">
                        <p className="leading-7.5 text-xl text-main">Floating Phone</p>
                        <div className="flex gap-2">
                            <Rating name="read-only" value="4" readOnly />
                            <p className="text-sm leading-6 font-bold">10 Reviews</p>
                        </div>

                        <p className="text-main text-2xl leading-8">$1,139.33</p>
                        <p className="text-sm leading-6 text-gray font-bold">Availability: <span className="text-primary-blue">In Stock </span></p>
                        <p className="text-gray text-sm leading-5 max-w-[455]">Met minim Mollie non desert Alamo est sit cliquey dolor
                            do met sent. RELIT official consequent door ENIM RELIT Mollie.
                            Excitation venial consequent sent nostrum met.</p>
                        <hr />
                        <div className="flex gap-2.5">
                            {colors.map((item, index) => {
                                return <div key={index} className={`bg-${item} w-[30px] h-[30px] rounded-full`}></div>
                            })}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <div>
                                <button className="rounded bg-primary-blue px-5 py-2.5 text-white text-sm leading-6">Select Options</button>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon="fa-regular fa-heart" /></button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <ProductDetails />

            <section className="w-screen bg-light-gray-1">
                <div className="mx-auto max-w-page-content flex flex-col items-center">
                    <h3 className="self-stretch pt-12 pb-6">BESTSELLER PRODUCTS</h3>
                    <hr className="h-[4px] border-0 mb-6 bg-[#ECECEC] self-stretch" />
                    <div className="flex flex-wrap justify-between gap-y-6 pb-12">
                        {bestseller.map((item, index) => {
                            return <ProductCardSecond key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            <Clients />
        </>
    )
}