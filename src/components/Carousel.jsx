import { useEffect, useRef, useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { imageBasePath } from "../../public/imgBasePath";

export default function Carousel({ slides, setCurrIndex = () => { return 0 }, haveText = true }) {
    const ref = useRef(null);
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    const getCarouselSize = () => {
        const newWidth = ref.current.clientWidth;
        setWidth(newWidth);

        const newHeight = ref.current.clientHeight;
        setHeight(newHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", getCarouselSize);
    }, []);
    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
        setHeight(ref.current ? ref.current.offsetHeight : 0)
    }, [ref.current]);

    let [current, setCurrent] = useState(0);
    useEffect(() => {
        setCurrIndex(current);
    }, [current])

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div ref={ref} className="overflow-hidden relative max-h-[800px]">
            <div
                className={`flex transition ease-out duration-1000 w-full relative z-20`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {haveText && slides.map((s, index) => {
                    return <div key={index} className={`absolute z-30`}
                        style={{
                            left: `${index === 0 ? width * 10 / 100 : index * width + (width * 10 / 100)}px`,
                            top: `${height * 30 / 100}px`
                        }}>
                        <div className="text-white flex flex-col gap-4">
                            <p className="text-sm">SUMMER 2020 - {index + 1}. Slide</p>
                            <p className="text-[56px] leading-[80px] font-bold w-[5000px]">NEW COLLECTION</p>
                            <p className="text-[18px] max-w-[350px]">We know how large objects will act, but things on a small scale.</p>
                            <div>
                                <button className="px-3 py-2 bg-success-green rounded text-[24px] relative">SHOP NOW</button>
                            </div>
                        </div>
                    </div>;
                })}

                {slides.map((s, index) => {
                    return <img key={index} src={s} className="object-cover" />
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
    );
}