import BestSellerProducts from "../components/BestsellerProducts"
import Carousel from "../components/Carousel"
import EditorsPick from "../components/EditorsPick"
import FeaturedPosts from "../components/FeaturedPosts"
import PartOfTheNeuralUniverse from "../components/PartOfTheNeuralUniverse"
import { firstCarouselContent, secondCarouselContent } from "../mock/carouselContentsData"

export default function HomePage() {
    return (
        <>
            <div className="w-screen bg-[#00B7DC]">
                <div className="max-w-[1440px] mx-auto max-h-[852px]">
                    <Carousel slides={firstCarouselContent} />
                </div>
            </div>

            <EditorsPick />
            <BestSellerProducts />
            <div className="w-screen bg-success-green">
                <div className="max-w-[1440px] mx-auto">
                    <Carousel slides={secondCarouselContent} />
                </div>
            </div>
            <PartOfTheNeuralUniverse />
            <FeaturedPosts />
        </>
    )
}