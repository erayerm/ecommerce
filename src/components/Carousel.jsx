import { useEffect, useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
    let [current, setCurrent] = useState(0);
    const [shownImages, setShownImages] = useState([]);
    const [colorIndex, setColorIndex] = useState(0);
    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    useEffect(() => {
        console.log(slides.length, current)
        if (slides.length <= 5) {
            setShownImages(slides)
            setColorIndex(current)
        } else if (current === 0) {
            setShownImages(slides.slice(0, 5))
            setColorIndex(0)
        } else if (current > slides.length - 5) {
            setShownImages(slides.slice(slides.length - 5, slides.length))
            setColorIndex(5 - slides.length + current)
        } else {
            setShownImages(slides.slice(current - 1, current + 4));
            setColorIndex(1);
        }
    }, [current])




    return (
        <>
            <div className="overflow-hidden relative max-h-[500px] aspect-square">
                <div
                    className={`flex transition ease-out duration-1000 w-full h-full relative z-20`}
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                    }}
                >
                    {slides.map((s, index) => {
                        return <img key={index} src={s.url} className="w-full h-full object-cover object-center" />
                    })}
                </div>
                <button className="absolute top-[50%] left-0 z-50 text-white px-10 text-3xl" onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button className="absolute top-[50%] right-0 z-50 text-white px-10 text-3xl" onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>

                <div className="absolute bottom-0 py-4 flex justify-center gap-1 w-full z-20">
                    {slides.map((s, i) => {
                        return (
                            <div
                                onClick={() => {
                                    setCurrent(i);
                                }}
                                key={"rectangle" + i}
                                className={`w-10 h-2 cursor-pointer  ${i == current ? "bg-white" : "bg-muted-text-color"
                                    }`}
                            ></div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-between mt-4">
                {shownImages.map((s, i) => {
                    return <div key={i} className={"basis-[18%] aspect-square" + " " + (colorIndex !== i ? "grayscale-[100%]" : "")}>
                        <img src={s.url} className="w-full aspect-square object-cover object-top" />
                    </div>
                })}
            </div>
        </>
    );
}