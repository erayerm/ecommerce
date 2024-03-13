import { useEffect, useState } from "react";
import { ecommerceAPI } from "../instance";
import { useSelector } from "react-redux";

export default function OlderOrders() {
    const token = useSelector(store => store.user.user.token)
    const [orders, setOrders] = useState([]);
    const [allAddress, setAllAddress] = useState([]);
    const [allOrderedProducts, setAllOrderedProducts] = useState([]);
    useEffect(() => {
        ecommerceAPI.get("/order", {
            headers: {
                Authorization: token
            }
        }).then(res => setOrders(res.data.reverse()))

        ecommerceAPI.get("/user/address", {
            headers: {
                Authorization: token
            }
        }).then(res => setAllAddress(res.data))


    }, [])

    useEffect(() => {
        orders.map((ord) =>
            ord.products.map(prod => {
                ecommerceAPI.get("/products/" + prod.id, {
                    headers: {
                        Authorization: token
                    }
                }).then(res => setAllOrderedProducts((prev) => [...prev, res.data]))
            })
        )
    }, [orders]);

    const findAddress = (index) => {
        return allAddress[allAddress.findIndex((item) => item.id == orders[index]?.address_id)]
    }

    return (
        <div className="max-w-page-content lg:px-2 mx-auto pt-5">
            <div className="w-100">
                <div className="flex gap-[4%] align-items-center">
                    <div className={"flex w-[48%] min-w-[200px] aspect-[1.5/1]" + (orders[0]?.products.length >= 3 ? " space-x-[-10%]" : "") + (orders[0]?.products.length === 2 ? " space-x-[-20%]" : "")}>
                        {orders[0]?.products.map((item, index) => {
                            if (index > 2) return "";
                            const imageURL = allOrderedProducts[allOrderedProducts.findIndex((i) => i.id == item.id)]?.images[0].url
                            return <img className={"border object-cover object-center" + (orders[0]?.products.length >= 3 ? " w-[40%]" : "") + (orders[0]?.products.length === 2 ? " w-[60%]" : "") + (orders[0]?.products.length === 1 ? " w-full" : "")} src={imageURL} key={index} />
                        })}
                    </div>
                    <div className="text-xl max-w-[48%] md:text-sm">
                        <h1 className="text-3xl font-bold pb-5 md:text-md">Siparişin Tamamlandı!</h1>
                        <p><span className="font-bold">Sipariş Tarihi:</span> {orders[0]?.order_date.slice(0, 10)} / {orders[0]?.order_date.slice(11, 16)}</p>
                        <p><span className="font-bold">Adres Bilgisi:</span> {findAddress(0)?.address}</p>
                        <p><span className="font-bold">Toplam Fiyat: </span>{orders[0]?.price}₺</p>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-bold md:text-md pt-5 pb-3">Önceki Siparişlerin</h2>
            <div className="flex flex-wrap gap-x-[6%] gap-y-3 lg:flex-col md:text-sm w-full">
                {orders?.slice(1).map((ord, ordIndex) => <div className="basis-[47%]" key={ordIndex}>
                    <div className="flex gap-[2%] w-full h-full items-center">
                        <div className={"flex w-[38%] min-w-[200px] aspect-[1.5/1]" + (ord.products.length >= 3 ? " space-x-[-10%]" : "") + (ord.products.length === 2 ? " space-x-[-20%]" : "")}>
                            {ord.products.map((item, index) => {
                                if (index > 2) return "";
                                const imageURL = allOrderedProducts[allOrderedProducts.findIndex((i) => i.id == item.id)]?.images[0].url
                                return <img className={"border object-cover object-center" + (ord.products.length >= 3 ? " w-[40%]" : "") + (ord.products.length === 2 ? " w-[60%]" : "") + (ord.products.length === 1 ? " w-full" : "")} src={imageURL} key={index} />
                            })}
                        </div>
                        <div className="max-w-[60%]">
                            <p><span className="font-bold">Sipariş Tarihi:</span> {orders[ordIndex]?.order_date.slice(0, 10)} / {orders[ordIndex]?.order_date.slice(11, 16)}</p>
                            <p><span className="font-bold">Adres Bilgisi:</span> {findAddress(ordIndex)?.address}</p>
                            <p><span className="font-bold">Toplam Fiyat: </span>{orders[ordIndex]?.price}₺</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}