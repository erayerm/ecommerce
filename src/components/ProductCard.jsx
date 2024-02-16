
export default function ProductCard({ data, size }) {

    return (
        <div className="flex flex-col items-center">
            <img src={data.img} className={`w-[240px] h-[${size[1]}px] object-cover object-top`} />
            <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                <h4 className="text-main text-base font-bold leading-6">{data.productName}</h4>
                <p className="text-gray text-sm font-bold leading-6">{data.secondTitle}</p>
                <div className="flex gap-1.5">
                    <p className="text-gray text-base font-bold leading-6">${data.priceDefault}</p>
                    <p className="text-dark-green text-base font-bold leading-6">${data.priceDiscounted}</p>
                </div>
                <div className="flex gap-1.5">
                    {data.colorOptions.map((item, index) => {
                        return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                    })}
                </div>
            </div>
        </div>

    )
}