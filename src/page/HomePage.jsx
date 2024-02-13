import BestSellerProducts from "../components/BestsellerProducts"
import CarouselComponent from "../components/Carousel"
import EditorsPick from "../components/EditorsPick"
import FeaturedPosts from "../components/FeaturedPosts"
import PartOfTheNeuralUniverse from "../components/PartOfTheNeuralUniverse"
import { firstCarouselContent, secondCarouselContent } from "../mock/carouselContentsData"

export default function HomePage() {

    return (
        <>
            <CarouselComponent items={firstCarouselContent} />
            <EditorsPick />
            <BestSellerProducts />
            <CarouselComponent items={secondCarouselContent} />
            <PartOfTheNeuralUniverse />
            <FeaturedPosts />
        </>
    )
}

