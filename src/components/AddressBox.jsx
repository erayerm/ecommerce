import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function AddressBox({ item, type }) {
    return (
        <div className="w-[45%] md:w-[80%] min-w-[320px]">
            <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                    <input type="radio" id={type + item.id} name={type + "Address"} value={item.id} />
                    <label htmlFor={type + item.id}>{item.title}</label><br />
                </div>
                <div>
                    <a>Edit</a>
                </div>
            </div>
            <div className="">
                <label htmlFor={type + item.id} className="block cursor-pointer">
                    <div className="w-full flex flex-col justify-center items-center rounded border mt-3 py-3 px-2 text-xs">
                        <div className="flex justify-between w-full ">
                            <div><FontAwesomeIcon className="text-primary-blue" icon="fa-solid fa-user-large" /> {item.name} {item.surname}</div>
                            <div><FontAwesomeIcon className="text-primary-blue" icon="fa-solid fa-phone" /> {item.phone}</div>
                        </div>
                        <div className="w-full font-bold pt-2">
                            {item.address}
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}