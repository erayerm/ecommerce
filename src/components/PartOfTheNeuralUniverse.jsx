export default function PartOfTheNeuralUniverse() {

    return (
        <section className="w-screen">
            <div className="my-0 mx-auto max-w-page-content flex md:flex-col-reverse justify-between items-center gap-20">
                <div className="md:w-full">
                    <img className="md:w-full" src="img/main-section-3-item.png" />
                </div>
                <div className="flex flex-col gap-7 max-w-[396px] md:text-center md:pt-[120px]">
                    <h5 className="font-bold leading-6 text-muted-text-color">SUMMER 2020</h5>
                    <h2 className="font-bold text-4.5xl leading-12.5">Part of the Neural Universe</h2>
                    <p className="text-xl leading-7.5">We know how large objects will act, but things on a small scale.</p>
                    <div className="font-bold text-sm leading-5.5 flex gap-2.5 md:justify-center md:flex-col">
                        <div>
                            <button className="bg-success-green text-white px-10 py-4 rounded-md border-2 border-success-green border-solid">BUY NOW</button>
                        </div>
                        <div>
                            <button className="bg-transparent text-success-green px-10 py-4 rounded-md border-2 border-success-green border-solid">READ MORE</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}