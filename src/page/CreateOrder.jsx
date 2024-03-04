import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressHookForm from "../components/AddressHookForm";
import { instance } from "../instance";
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
    const [formOpen, setFormOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [allAddress, setAllAddress] = useState([]);
    const [addressEdit, setAddressEdit] = useState({});
    const [allCards, setAllCards] = useState([]);

    const handlePage = (page) => {
        setPage(page);
    }
    const handleCheck = () => {
        setPaymentReceipt(!paymentReceipt);
    }
    const handleForm = () => {
        setFormOpen(!formOpen)
    }
    const handleAddCardForm = () => {
        setCardOpen(!cardOpen)
    }
    const handleEdit = (element) => {
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
        handleForm();
    }
    const handleDelete = (element) => {
        instance.delete("/user/address/" + element.target.id, {
            headers: {
                Authorization: token
            }
        })
            .then(() => setAddressEdit({}))
            .catch((err) => console.error(err))
    }
    const handleSubmit = (formData) => {
        formData = {
            ...formData, district: getDistrictsByCityCode(formData.city)[formData.district]
        }
        for (const city of getCities()) {
            if (city.code === formData.city) {
                formData = { ...formData, city: city.name }
                break;
            }
        }
        instance.post("/user/address", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getAddress())
            .then(() => setFormOpen(false))
            .catch(err => console.error(err))
    }
    const handleCardSubmit = (formData) => {
        delete formData.cvv;
        instance.post("/user/card", formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => getCard())
            .then(() => setCardOpen(false))
            .catch(err => console.error(err))
    }
    const handleEditSubmit = (formData) => {
        formData = {
            ...formData, district: getDistrictsByCityCode(formData.city)[formData.district]
        }
        for (const city of getCities()) {
            if (city.code === formData.city) {
                formData = { ...formData, city: city.name }
                break;
            }
        }
        instance.put("/user/address/" + addressEdit.id, formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => setAddressEdit({}))
            .catch((err) => console.error(err))

    }
    const getAddress = () => {
        instance.get("/user/address", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setAllAddress(res.data))
            .catch(err => console.error(err));
    }
    const getCard = () => {
        instance.get("/user/card", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setAllCards(res.data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAddress();
        getCard();
    }, [])

    return (
        <div className="w-screen text-main">
            <div className="flex max-w-[1450px] mx-auto xl:flex-col xl:gap-10">
                <div className="basis-[60%]">
                    <div className="flex mb-3">
                        <div onClick={() => handlePage("address")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + " " + (page === "address" ? "border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Adres Bilgileri</h2>
                            <p className="text-gray text-sm">Adres Adı</p>
                            <p className="text-gray text-sm">Adres itself</p>
                            <p className="text-gray text-sm">posta kodu - il/ilçe</p>
                        </div>
                        <div onClick={() => handlePage("payment")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + " " + (page === "payment" ? "border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Ödeme Seçenekleri</h2>
                            <p className="text-sm text-main"><span className="font-bold">Banka/Kredi Kartı</span> veya <span className="font-bold">Alışveriş Kredisi</span> ile ödemenizi güvenle yapabilirsiniz.</p>
                        </div>
                    </div>
                    <div>
                        {
                            page === "address"
                                ? formOpen
                                    ? <div>
                                        <div className="flex justify-end">
                                            <button onClick={handleForm} className="flex items-center gap-2"><FontAwesomeIcon className="text-2xl" icon="fa-solid fa-left-long" /> Go Back</button>
                                        </div>
                                        <AddressHookForm submitFn={handleSubmit} editFn={handleEditSubmit} initialData={addressEdit} />
                                    </div>
                                    : <div className="flex flex-col px-3">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl">Shipping Address</h2>
                                            <div className="flex items-center">
                                                <Checkbox {...label} checked={paymentReceipt} onClick={handleCheck} size="small" />
                                                <p className="text-sm">Send receipt to same address</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-wrap gap-y-10 gap-x-[10%] md:justify-center">
                                            <div onClick={handleForm} className="w-[45%] md:w-[80%] min-w-[300px] cursor-pointer flex flex-col justify-center items-center rounded border-2 border-dotted border-primary-blue mt-4 py-3">
                                                <div className="text-center" >
                                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" />
                                                    <p>Add New Address</p>
                                                </div>
                                            </div>
                                            {allAddress.map((item, index) => {
                                                return <AddressBox item={item} type="shipping" key={index} handleEdit={handleEdit} handleDelete={handleDelete} />
                                            })}

                                        </div>
                                        {!paymentReceipt &&
                                            <>
                                                <div className="flex items-center justify-between pt-5">
                                                    <h2 className="text-xl">Receipt Address</h2>
                                                </div>
                                                <div className="w-full flex flex-wrap gap-y-10 gap-x-[10%]">
                                                    <div onClick={handleForm} className="w-[45%] md:w-[80%] min-w-[300px] cursor-pointer flex flex-col justify-center items-center rounded border-2 border-dotted border-primary-blue mt-4 py-3">
                                                        <div className="text-center" >
                                                            <FontAwesomeIcon icon="fa-solid fa-plus" className="text-primary-blue" />
                                                            <p>Add New Address</p>
                                                        </div>
                                                    </div>
                                                    {allAddress.map((item, index) => {
                                                        return <AddressBox item={item} type="receipt" key={index} handleEdit={handleEdit} handleDelete={handleDelete} />
                                                    })}
                                                </div>

                                            </>
                                        }
                                    </div>
                                : <div className="px-3">
                                    <div className="flex justify-between items-center mb-3">
                                        <h2>Card Details</h2>
                                        <button onClick={handleAddCardForm}>{!cardOpen ? "Add another card" : <div className="flex items-center gap-2"><p>Close form </p><FontAwesomeIcon className="text-xs" icon="fa-solid fa-x" /></div>}</button>
                                    </div>
                                    <div>
                                        {
                                            cardOpen
                                                ? <CardHookForm submitFn={handleCardSubmit} />
                                                : ""
                                        }
                                    </div>
                                    <div className="w-full flex flex-wrap gap-y-10 gap-x-[10%]">
                                        {allCards.map((item, index) => {
                                            return <CreditCardCard key={index} data={item} />
                                        })}
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className="basis-[40%]">
                    <OrderSummary />

                </div>
            </div>
        </div>
    )
}