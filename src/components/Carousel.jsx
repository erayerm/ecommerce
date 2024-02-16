import { useState } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { imageBasePath } from "../../public/imgBasePath";
export default function Carousel({ slides, setCurrIndex }) {
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
        setCurrIndex(current);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
        setCurrIndex(current);
    };

    return (
        <div className="overflow-hidden relative">
            <div
                className={`flex transition ease-out duration-1000`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((s, index) => {
                    return <>
                        <img className="object-cover" src={imageBasePath + s} />;
                        {/*<div className="absolute left-[14%] top-[29%] text-white flex flex-col gap-4">
                            <p className="text-sm">SUMMER 2020</p>
                            <p className="text-[56px] font-bold">NEW COLLECTION</p>
                            <p className="text-[18px] max-w-[350px]">We know how large objects will act, but things on a small scale.</p>
                            <div>
                                <button className="px-3 py-2 bg-success-green rounded text-[24px]">SHOP NOW</button>
                            </div>
                        </div>
                        */}
                    </>
                })}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {
                    return (
                        <div
                            onClick={() => {
                                setCurrent(i);
                            }}
                            key={"circle" + i}
                            className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}