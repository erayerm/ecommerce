import axios from "axios";
import { useEffect } from "react";

export default function CreditCardCard({ data, handleEdit, handleDelete }) {
    /*
    useEffect(() => {
        axios.get(("https://neutrinoapi.net/bin-lookup"), {
            withCredentials: false,
            params: {
                "bin-number": ""
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "User-ID": "",
                "API-Key": ""
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
    }, [])
    */
    let cardNoWithSpaces = ""
    for (let i = 1; i < data.card_no.length + 1; i++) {
        cardNoWithSpaces += data.card_no[i - 1];
        if (i % 4 === 0) cardNoWithSpaces += " ";
    }
    let cencoredCardNumber = cardNoWithSpaces.slice(0, 7) + "** ****" + cardNoWithSpaces.slice(14);

    return (
        <div className="w-[45%] md:w-[80%] min-w-[320px]">
            <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                    <input type="radio" id={data.id} name={"Card"} value={data.id} />
                    <label htmlFor={data.id}>{"Card " + data.id}</label><br />
                </div>
                <div className="flex gap-4">
                    <button id={data.id} onClick={handleEdit} className="hover:text-primary-blue">Edit</button>
                    <button id={data.id} onClick={handleDelete} className="hover:text-[#800000]">Delete</button>
                </div>
            </div>
            <div className="w-full">
                <label className="w-full" htmlFor={data.id}>
                    <div className="border rounded w-full aspect-[3.37/2.125] flex flex-col justify-between bg-gray text-white px-4 py-5">
                        <div className="w-[15%]">
                            <img src="/img/creditCardChip.png" className="w-full" />
                        </div>
                        <div className="text-right text-2xl flex flex-col justify-end items-end">
                            <p>{cencoredCardNumber}</p>
                            <p>{data.expire_month}/{data.expire_year}</p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}