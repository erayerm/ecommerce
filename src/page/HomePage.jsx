import BestSellerCard from "../components/BestSellerCard"
import { bestseller } from "../mock/bestSellerData"


export default function HomePage() {

    return (
        <div>
            {/*Carousel Will be Added Later*/}
            <section className="w-screen bg-[#FAFAFA]">
                <div className="my-0 mx-auto max-w-[1050px] flex flex-col items-center">
                    <h3 className="text-2xl leading-8 font-bold pt-20">EDITOR&apos;S PICK</h3>
                    <p className="pt-2.5 pb-12">Problems trying to resolve the conflict between</p>
                    <div className="flex flex-wrap gap-7 pb-20">
                        <div className="w-[510px] h-[500px] flex items-end bg-[url('/img/main-section-1-man.png')] bg-cover">
                            <p className="py-3 px-[65px] text-black bg-white">MEN</p>
                        </div>
                        <div className="w-[240px] h-[500px] flex items-end bg-[url('/img/main-section-1-women.png')] bg-cover">
                            <p className="py-3 px-3 text-black bg-white">WOMEN</p>
                        </div>
                        <div className="w-[240px] flex flex-col justify-between">
                            <div className="w-full h-[240px] flex items-end bg-[url('/img/main-section-1-accessories.png')] bg-cover">
                                <p className="py-3 px-3 text-black bg-white">ACCESSORIES</p>
                            </div>
                            <div className="w-full h-[240px] flex items-end bg-[url('/img/main-section-1-kids.png')] bg-cover">
                                <p className="py-3 px-3 text-black bg-white">KIDS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-screen">
                <div className="my-0 mx-auto max-w-[1050px] flex flex-col items-center py-20">
                    <div className="flex flex-col items-center gap-2.5 pb-20">
                        <h4 className="text-[#737373] text-xl">Featured Products</h4>
                        <h3 className="text-[#252B42] text-2xl font-bold leading-8">BESTSELLER PRODUCTS</h3>
                        <p className="text-sm text-[#737373] leading-5">Problems trying to resolve the conflict between</p>
                    </div>
                    <div className="flex flex-wrap gap-x-7 gap-y-20 justify-center">
                        {bestseller.map((item, index) => {
                            return <BestSellerCard key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            {/*Carousel Will be Added Later*/}

            <section className="w-screen">
                <div className="my-0 mx-auto max-w-[1050px] flex justify-between items-center gap-20">
                    <div>
                        <img src="img/main-section-3-item.png" />
                    </div>
                    <div className="flex flex-col gap-7 w-[396px]">
                        <h5 className="font-bold leading-6 text-[#BDBDBD]">SUMMER 2020</h5>
                        <h2 className="font-bold text-[40px] leading-[50px]">Part of the Neural Universe</h2>
                        <p className="text-xl leading-[30px]">We know how large objects will act, but things on a small scale.</p>
                        <div className="font-bold text-sm leading-[22px] flex gap-2.5">
                            <button className="bg-[#2DC071] text-white px-10 py-4 rounded-md border-2 border-[#2DC071] border-solid">BUY NOW</button>
                            <button className="bg-white text-[#2DC071] px-10 py-4 rounded-md border-2 border-[#2DC071] border-solid">READ MORE</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

