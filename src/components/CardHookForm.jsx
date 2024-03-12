import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

const yearList = [];
const monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const currentYear = new Date().getFullYear();
for (let i = 0; i < 15; i++) {
    yearList.push(currentYear + i);
}

export default function CardHookForm({ submitFn, editFn, initialData }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: Object.keys(initialData).length ? initialData : {
            card_no: '',
            expire_month: "",
            expire_year: "",
            name_on_card: '',
            cvv: ""
        },
        mode: 'all',
    });



    return (
        <>
            <form className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl" onSubmit={Object.keys(initialData).length ? handleSubmit(editFn) : handleSubmit(submitFn)}>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="card_no">
                        Card No
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="card_no"
                            type="text"
                            placeholder='Card No'
                            {...register('card_no', {
                                required: 'Card No is required'
                            })}
                        />
                    </div>
                    {errors.card_no && (
                        <p className="input-error">{errors.card_no.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="expire_month" >
                        Expire Month
                    </label>
                    <select
                        name="expire_month"
                        id="expire_month"
                        className='input-text w-full'
                        value={watch("expire_month")}
                        {...register('expire_month', {
                            required: "Expire Month is required"
                        })}
                    >
                        {monthList.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="expire_year" >
                        Expire Year
                    </label>
                    <select
                        name="expire_year"
                        id="expire_year"
                        className='input-text w-full'
                        value={watch("expire_year")}
                        {...register('expire_year', {
                            required: "Expire Year is required"
                        })}
                    >
                        {yearList.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="name_on_card">
                        Name on card
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="name_on_card"
                            type="text"
                            placeholder='Name on card'
                            {...register('name_on_card', {
                                required: 'Name is required',
                            })}
                        />
                    </div>
                    {errors.name_on_card && (
                        <p className="input-error">{errors.name_on_card.message}</p>
                    )}
                </div>
                <div className="form-line w-full">
                    <label className="input-label" htmlFor="cvv">
                        CVV
                    </label>
                    <div>
                        <input
                            className="input-text w-full"
                            id="cvv"
                            type="text"
                            placeholder='CVV'
                            {...register('cvv', {
                                pattern: {
                                    value: /^\d{3}$/,
                                    message: "CVV is invalid"
                                },
                                required: 'CVV is required'
                            })}
                        />
                    </div>
                    {errors.cvv && (
                        <p className="input-error">{errors.cvv.message}</p>
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