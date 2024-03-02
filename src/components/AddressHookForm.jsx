import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods'

export default function AddressHookForm({ submitFn, editFn, initialData }) {

    //diğer adresleri alıp başlıklarının aynı olmamasını sağlaman gerek
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initialData ? initialData : {
            title: '',
            name: "",
            surname: "",
            phone: '',
            city: "",
            district: "",
            neighborhood: "",
            address: "",
        },
        mode: 'all',
    });

    const cities = getCities();
    const citySelected = watch("city");
    const districts = getDistrictsByCityCode(citySelected)
    return (
        <>
            <form className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl" onSubmit={initialData ? handleSubmit(editFn) : handleSubmit(submitFn)}>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="title">
                        Address Title
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="title"
                            type="text"
                            placeholder='Address Title'
                            {...register('title', {
                                required: 'Address Title is required'
                            })}
                        />
                    </div>
                    {errors.title && (
                        <p className="input-error">{errors.title.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="name">
                        Name
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="name"
                            type="text"
                            placeholder='Name'
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                    </div>
                    {errors.name && (
                        <p className="input-error">{errors.name.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="surname">
                        Surname
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="surname"
                            type="text"
                            placeholder='Surname'
                            {...register('surname', {
                                required: 'Surname is required',
                            })}
                        />
                    </div>
                    {errors.surname && (
                        <p className="input-error">{errors.surname.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="phone">
                        Phone
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="phone"
                            type="text"
                            placeholder='Phone'
                            {...register('phone', {
                                required: 'Phone is required',
                                pattern: {
                                    value: /^(?:\+90.?5|0090.?5|905|0?5)(?:[01345][0-9])\s?(?:[0-9]{3})\s?(?:[0-9]{2})\s?(?:[0-9]{2})$/,
                                    message: "Phone is invalid"
                                }
                            })}
                        />
                    </div>
                    {errors.phone && (
                        <p className="input-error">{errors.phone.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="city" >
                        City
                    </label>
                    <select
                        name="city"
                        id="city"
                        className='input-text w-full'
                        value={watch("city")}
                        {...register('city', {
                            required: "City is required"
                        })}
                    >
                        {cities.map((item, index) => {
                            return <option key={index} value={item.code}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="district" >
                        District
                    </label>
                    <select
                        disabled={citySelected === "" ? true : false}
                        name="district"
                        id="district"
                        className='input-text w-full disabled:bg-light-gray-1'
                        value={watch("district")}
                        {...register('district', {
                            required: "District is required"
                        })}
                    >
                        {districts.map((item, index) => {
                            return <option key={index} value={index}>{item}</option>
                        })}
                    </select>
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="neighborhood">
                        Neighborhood
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="neighborhood"
                            type="text"
                            placeholder='Neighborhood'
                            {...register('neighborhood', {
                                required: 'Neighborhood is required'
                            })}
                        />
                    </div>
                    {errors.neighborhood && (
                        <p className="input-error">{errors.neighborhood.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="address">
                        Address
                    </label>
                    <div>
                        <textarea
                            className="input-text w-full"
                            id="address"
                            placeholder='Address'
                            {...register('address', {
                                required: 'Address is required'
                            })}
                        />
                    </div>
                    {errors.address && (
                        <p className="input-error">{errors.address.message}</p>
                    )}
                </div>

                <div className="form-line w-full">
                    <div className='mx-auto'>
                        <button className="bg-primary-blue disabled:bg-gray text-white text-sm leading-7 py-2.5 px-12 rounded min-h-[50px] min-w-[150px] flex items-center justify-center" type="submit" disabled={!isValid}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}