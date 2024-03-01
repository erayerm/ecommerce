import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { thirdCarouselContent } from "../mock/carouselContentsData";
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductDetails from "../components/ProductDetails";
import Carousel from "../components/Carousel";
import { bestseller } from "../mock/bestSellerData";
import ProductCardSecond from "../components/ProductCardSecond";
import Clients from "../components/Clients";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsWithId } from "../store/actions/ProductActions";

const colors = ["[#23A6F0]", "success-green", "[#E77C40]", "[#252B42]"];



export default function ProductPage() {
    let { productId } = useParams();

    let productData = useSelector(store => store.productStore.currentProduct);
    const [productLoading, setProductLoading] = useState(true);
    const dispatch = useDispatch()
    const history = useHistory();

    const handleBack = () => {
        if (history.action === 'POP') {
            history.push('/shop');
        } else {
            history.goBack();
        }
    }

    useEffect(() => {
        dispatch(fetchProductsWithId(productId, setProductLoading))
    }, [])

    if (productLoading) return "";
    //productData = { ...productData, images: [...productData.images, ...productData.images] };
    return (
        <>
            <section className="width-screen bg-light-gray-1">
                <div className="max-w-page-content mx-auto py-6 flex items-center justify-between font-bold text-sm leading-6">
                    <div className="flex items-center gap-3.5 px-3">
                        <Link to="/" className="text-main">Home</Link>
                        <p className="text-muted-text-color font-thin text-4xl">{">"}</p>
                        <p className="text-muted-text-color">Shop</p>
                    </div>
                    <div>
                        <button onClick={handleBack} className="flex items-center gap-2"><FontAwesomeIcon className="text-2xl" icon="fa-solid fa-left-long" /> Go Back</button>
                    </div>
                </div>
                <div className="max-w-page-content mx-auto flex sm:flex-col gap-[30px] pb-12 lg:px-7 lg:items-center">
                    <div className="flex-1 max-w-[506px] flex flex-col">
                        <div className="w-full aspect-[10/9]">
                            <Carousel slides={productData.images} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 pt-4 ">
                        <p className="leading-7.5 text-xl text-main">{productData.name}</p>
                        <div className="flex gap-2">
                            <Rating name="read-only" value={Math.round(productData.rating)} readOnly />
                            <p className="text-sm leading-6 font-bold">10 Reviews</p>
                        </div>

                        <p className="text-main text-2xl leading-8">${productData.price}</p>
                        <p className="text-sm leading-6 text-gray font-bold">Availability: <span className="text-primary-blue">{productData.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                        <p className="text-gray text-sm leading-5 max-w-[455]">{productData.description}</p>
                        <hr />
                        <div className="flex gap-2.5">
                            {colors.map((item, index) => {
                                return <div key={index} className={`bg-${item} w-[30px] h-[30px] rounded-full`}></div>
                            })}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <div>
                                <button className="rounded bg-primary-blue px-5 py-2.5 sm:px-0 text-white text-sm leading-6">Select Options</button>
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
                    <div className="flex flex-wrap justify-center gap-x-7 gap-y-6 pb-12">
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