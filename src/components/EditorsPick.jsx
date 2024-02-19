
export default function EditorsPick() {

    return (
        <section className="w-screen bg-light-gray-1">
            <div className="my-0 mx-auto max-w-page-content flex flex-col items-center">
                <h3 className="text-2xl leading-8 font-bold pt-20">EDITOR&apos;S PICK</h3>
                <p className="pt-2.5 pb-12 sm:max-w-[220px] text-center">Problems trying to resolve the conflict between</p>
                <div className="flex h-[500px] lg:h-max lg:flex-col lg:w-[80%] sm:w-[70%] flex-wrap gap-7 mb-20 w-full">
                    <div className="flex flex-1 items-end lg:w-full lg:aspect-square sm:aspect-[32/50] bg-[url('/img/main-section-1-man.png')] bg-cover">
                        <p className="m-7 py-3 px-[65px] text-black bg-white">MEN</p>
                    </div>
                    <div className="flex-1 flex gap-7 lg:w-full lg:aspect-square sm:flex-col sm:h-max" >
                        <div className="flex flex-1 items-end bg-[url('/img/main-section-1-women.png')] sm:w-full sm:aspect-[32/50] bg-cover">
                            <p className="m-7 py-3 px-3 text-black bg-white">WOMEN</p>
                        </div>
                        <div className="sm:w-full flex flex-1 flex-col gap-4">
                            <div className="sm:w-full sm:aspect-[32/24] w-full flex-1 flex items-end bg-[url('/img/main-section-1-accessories.png')] bg-cover">
                                <p className="m-7 py-3 px-3 text-black bg-white">ACCESSORIES</p>
                            </div>
                            <div className="sm:w-full sm:aspect-[32/24] w-full flex-1 flex items-end bg-[url('/img/main-section-1-kids.png')] bg-cover">
                                <p className="m-7 py-3 px-3 text-black bg-white">KIDS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}