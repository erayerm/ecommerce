import { useEffect, useRef, useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function CarouselMainFirst({ slides }) {
    const ref = useRef(null);

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    let [current, setCurrent] = useState(0);


    const getCarouselSize = () => {
        const newWidth = ref.current.clientWidth;
        setWidth(newWidth);

        const newHeight = ref.current.clientHeight;
        setHeight(newHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", getCarouselSize);
        return () => {
            window.removeEventListener('resize', getCarouselSize);
        };
    }, []);
    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 0)
        setHeight(ref.current ? ref.current.offsetHeight : 0)
    }, [ref.current]);


    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };
    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div ref={ref} className="relative w-full h-full overflow-hidden">
            <div
                className={`relative w-full h-full transition ease-out duration-1000`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((s, index) => {
                    return <div key={index} className={`absolute z-30`}
                        style={{
                            left: `${index === 0 ? width * 10 / 100 : index * width + (width * 10 / 100)}px`,
                            top: `${height * 25 / 100}px`
                        }}>
                        <div className="text-white flex flex-col gap-4 sm:items-center sm:text-center md:ml-20">
                            <p className="text-sm">SUMMER 2020 - {index + 1}. Slide</p>
                            <p className="text-6xl leading-20 font-bold w-[5000px] lg:max-w-[300px] lg:text-4xl">NEW COLLECTION</p>
                            <p className="text-lg max-w-[300px] md:max-w-[300px]">We know how large objects will act, but things on a small scale.</p>
                            <div>
                                <button className="md:px-1.5 md:py-0.5 px-3 py-2 bg-success-green rounded text-2xl lg:text-xl relative">SHOP NOW</button>
                            </div>
                        </div>
                    </div>;
                })}
                {slides.map((s, index) => {
                    return <img key={"img" + index} src={s} className="absolute object-cover object-top" style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        left: `${index * width}px`,
                        top: `0`,
                    }} />
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
        </div >
    );
}