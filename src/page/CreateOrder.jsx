import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressHookForm from "../components/AddressHookForm";
import { ecommerceAPI } from "../instance";
import { useSelector } from "react-redux";
import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods'
import OrderSummary from "../components/OrderSummary";
import AddressBox from "../components/AddressBox";
import CardHookForm from "../components/CardHookForm";
import CreditCardCard from "../components/CreditCardCard";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CreateOrder() {
    const [page, setPage] = useState("address");
    const [paymentReceipt, setPaymentReceipt] = useState(true);
    const token = useSelector(store => store.user.user.token)
    const cart = useSelector(store => store.shoppingCart.cart);
    const [addressFormOpen, setAddressFormOpen] = useState(false);
    const [cardFormOpen, setCardFormOpen] = useState(false);
    const [allAddress, setAllAddress] = useState([]);
    const [addressEdit, setAddressEdit] = useState({});
    const [cardEdit, setCardEdit] = useState({});
    const [allCards, setAllCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [selectedShippingAddress, setSelectedShippingAddress] = useState({})

    const handlePage = (page) => {
        setPage(page);
    }
    const handleReceiptCheck = () => {
        setPaymentReceipt(!paymentReceipt);
    }
    const handleAddressForm = () => {
        setAddressFormOpen(!addressFormOpen)
    }
    const handleAddressGoBack = () => {
        setAddressFormOpen(!addressFormOpen)
        setAddressEdit({});
    }
    const handleCardForm = () => {
        setCardFormOpen(!cardFormOpen)
    }
    const handleCardGoBack = () => {
        setCardFormOpen(!cardFormOpen)
        setCardEdit({});
    }
    const handleAddressEdit = (element) => {
        if (element.target.id) {
            for (const addr of allAddress) {
                if (addr.id == element.target.id) {
                    let cityCode = getCities().find(o => o.name == addr.city).code;
                    let districtCode = getDistrictsByCityCode(cityCode).indexOf(getDistrictsByCityCode(cityCode).find(o => o == addr.district))
                    setAddressEdit({ ...addr, city: cityCode, district: districtCode });
                    break;
                }
            }
        }
        handleAddressForm();
    }
    const handleAddressDelete = (element) => {
        ecommerceAPI.delete("/user/address/" + element.target.id, {
            headers: {
                Authorization: token
            }
        })
            .then(() => setAddressEdit({}))
            .catch((err) => console.error(err))
    }
    const handleCardDelete = (element) => {
        ecommerceAPI.delete("/user/card/" + element.target.id, {
            headers: {
                Authorization: token
            }
        })
            .then(() => setCardEdit({}))
            .catch((err) => console.error(err))
    }
    const handleCardEdit = (element) => {
        if (element.target.id) {
            for (const car of allCards) {
                if (car.id == element.target.id) {
                    const expireMonthTwoDigit = car.expire_month < 10 ? "0" + car.expire_month : car.expire_month
                    setCardEdit({ ...car, expire_month: expireMonthTwoDigit });
                    break;
                }
            }
        }
        handleCardForm();
    }
    const handleAddressSubmit = (formData) => {
        formData = {
            ...formData, district: getDistrictsByCityCode(formData.city)[formData.district]
        }
        for (const city of getCities()) {
            if (city.code === formData.city) {
                formData = { ...formData, city: city.name }
                break;
            }
        }
        ecommerceAPI.post("/user/address", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getAddress())
            .then(() => setAddressFormOpen(false))
            .catch(err => console.error(err))
    }
    const handleCardSubmit = (formData) => {
        delete formData.cvv;
        ecommerceAPI.post("/user/card", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getCard())
            .then(() => setCardFormOpen(false))
            .catch(err => console.error(err))
    }
    const handleAddressEditSubmit = (formData) => {
        formData = {
            ...formData, district: getDistrictsByCityCode(formData.city)[formData.district]
        }
        for (const city of getCities()) {
            if (city.code === formData.city) {
                formData = { ...formData, city: city.name }
                break;
            }
        }
        ecommerceAPI.put("/user/address/", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getAddress())
            .then(() => setAddressFormOpen(false))
            .then(() => setAddressEdit({}))
            .catch((err) => console.error(err))

    }
    const handleCardEditSubmit = (formData) => {
        delete formData.cvv
        ecommerceAPI.put("/user/card/", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getCard())
            .then(() => setCardFormOpen(false))
            .then(() => setCardEdit({}))
            .catch((err) => console.error(err))
    }
    const getAddress = () => {
        ecommerceAPI.get("/user/address", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setAllAddress(res.data))
            .catch(err => console.error(err));
    }
    const getCard = () => {
        ecommerceAPI.get("/user/card", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setAllCards(res.data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAddress();
        setSelectedShippingAddress(allAddress[0]);
        getCard();
    }, [])


    const handleCardRadio = (event) => {
        const cardId = event.target.value;
        for (const card of allCards) {
            if (cardId == card.id) {
                setSelectedCard(card);
                break;
            }
        }
    }

    const handleShippingAddressRadio = (event) => {
        const addressId = event.target.value;
        for (const address of allAddress) {
            if (addressId == address.id) {
                setSelectedShippingAddress(address);
                break;
            }
        }
    }

    const completeOrder = () => {
        const totalPriceProducts = cart.reduce((accumulator, currentValue) => {
            if (currentValue.checked) {
                return accumulator + currentValue.count * currentValue.product.price;
            }
            return accumulator;
        },
            0
        )
        const shippingPaymentPrice = 29.90;
        const shippingDiscountLimit = 150;
        let totalPriceAll = totalPriceProducts + shippingPaymentPrice - (totalPriceProducts >= shippingDiscountLimit ? shippingPaymentPrice : 0)
        totalPriceAll = (Math.round(totalPriceAll * 100) / 100).toFixed(2)
        const productsBought = [];
        for (const product of cart) {
            if (product.checked) {
                productsBought.push({ product_id: product.product.id, count: product.count, detail: product.product.name })
            }
        }
        console.log(productsBought)

        ecommerceAPI.post("/order", {
            "address_id": selectedShippingAddress.id,
            "order_date": new Date().toISOString().slice(0, 19),
            "card_no": selectedCard.card_no,
            "card_name": selectedCard.name_on_card,
            "card_expire_month": selectedCard.expire_month,
            "card_expire_year": selectedCard.expire_year,
            "card_ccv": 111,
            "price": totalPriceAll,
            "products": [...productsBought]
        }, {
            headers: {
                Authorization: token
            }
        }).then(res => console.log(res)).catch(err => console.error(err))

        ecommerceAPI.get("/order", {
            headers: {
                Authorization: token
            }
        }).then(res => console.log(res.data))

    }

    return (
        <div className="w-screen text-main">
            <div className="flex max-w-[1450px] mx-auto xl:flex-col xl:gap-10">
                <div className="basis-[60%]">
                    <div className="flex mb-3">
                        <div onClick={() => handlePage("address")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + " " + (page === "address" ? "border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Adres Bilgileri</h2>
                            <p className="text-gray text-sm">{selectedShippingAddress?.title ? selectedShippingAddress.title : allAddress[0]?.title ? allAddress[0].title : ""}</p>
                            <p className="text-gray text-sm">{selectedShippingAddress?.address ? selectedShippingAddress.address : allAddress[0]?.address ? allAddress[0].address : ""}</p>
                            <p className="text-gray text-sm">{selectedShippingAddress?.city ? selectedShippingAddress.city + "/" : allAddress[0]?.city ? allAddress[0].city + "/" : ""}{selectedShippingAddress?.district ? selectedShippingAddress.district : allAddress[0]?.district ? allAddress[0].district : ""}</p>
                        </div>
                        <div onClick={() => handlePage("payment")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + " " + (page === "payment" ? "border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Ödeme Seçenekleri</h2>
                            <p className="text-sm text-main"><span className="font-bold">Banka/Kredi Kartı</span> veya <span className="font-bold">Alışveriş Kredisi</span> ile ödemenizi güvenle yapabilirsiniz.</p>
                        </div>
                    </div>
                    <div>
                        {
                            page === "address"
                                ? addressFormOpen
                                    ? <div>
                                        <div className="flex justify-end">
                                            <button onClick={handleAddressGoBack} className="flex items-center gap-2"><FontAwesomeIcon className="text-2xl" icon="fa-solid fa-left-long" /> Go Back</button>
                                        </div>
                                        <AddressHookForm submitFn={handleAddressSubmit} editFn={handleAddressEditSubmit} initialData={addressEdit} />
                                    </div>
                                    : <div className="flex flex-col px-3">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl">Shipping Address</h2>
                                            <div className="flex items-center">
                                                <Checkbox {...label} checked={paymentReceipt} onClick={handleReceiptCheck} size="small" />
                                                <p className="text-sm">Send receipt to same address</p>
                                            </div>
                                        </div>
                                        <div onChange={handleShippingAddressRadio} className="w-full flex flex-wrap gap-y-10 gap-x-[10%] md:justify-center">
                                            <div onClick={handleAddressForm} className="w-[45%] md:w-[80%] min-w-[300px] cursor-pointer flex flex-col justify-center items-center rounded border-2 border-dotted border-primary-blue mt-4 py-3">
                                                <div className="text-center" >
                                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" />
                                                    <p>Add New Address</p>
                                                </div>
                                            </div>
                                            {allAddress.map((item, index) => {
                                                return <AddressBox item={item} type="shipping" key={index} handleEdit={handleAddressEdit} handleDelete={handleAddressDelete} />
                                            })}

                                        </div>
                                        {!paymentReceipt &&
                                            <>
                                                <div className="flex items-center justify-between pt-5">
                                                    <h2 className="text-xl">Receipt Address</h2>
                                                </div>
                                                <div className="w-full flex flex-wrap gap-y-10 gap-x-[10%]">
                                                    <div onClick={handleAddressForm} className="w-[45%] md:w-[80%] min-w-[300px] cursor-pointer flex flex-col justify-center items-center rounded border-2 border-dotted border-primary-blue mt-4 py-3">
                                                        <div className="text-center" >
                                                            <FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" />
                                                            <p>Add New Address</p>
                                                        </div>
                                                    </div>
                                                    {allAddress.map((item, index) => {
                                                        return <AddressBox item={item} type="receipt" key={index} handleEdit={handleAddressEdit} handleDelete={handleAddressDelete} />
                                                    })}
                                                </div>

                                            </>
                                        }
                                    </div>
                                : <div className="px-3">
                                    <div className="flex justify-between items-center mb-3">
                                        <h2>Card Details</h2>
                                        {!cardFormOpen
                                            ? <button onClick={handleCardForm}>Add another card</button>
                                            : <button onClick={handleCardGoBack}><div className="flex items-center gap-2"><p>Close form </p><FontAwesomeIcon className="text-xs" icon="fa-solid fa-x" /></div></button>
                                        }
                                    </div>
                                    <div>
                                        {
                                            cardFormOpen
                                                ? <CardHookForm submitFn={handleCardSubmit} editFn={handleCardEditSubmit} initialData={cardEdit} />
                                                : ""
                                        }
                                    </div>
                                    <div onChange={handleCardRadio} className="w-full flex flex-wrap md:justify-center gap-y-10 gap-x-[10%]">
                                        {allCards.map((item, index) => {
                                            return <CreditCardCard key={index} data={item} handleEdit={handleCardEdit} handleDelete={handleCardDelete} />
                                        })}
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="basis-[40%]">
                    <OrderSummary />
                    <div className="px-10">
                        <div>
                            <button className="w-full py-3 bg-primary-blue text-white mt-4 text-xl rounded text-center" onClick={completeOrder}>Complete Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}