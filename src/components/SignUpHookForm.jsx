import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../store/actions/GlobalActions';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const passwordErrorsText = ["At least one lowercase letter", "At least one uppercase letter", "At least one digit", "At least one special character", "At least eight character"]

export default function SignUpHookForm({ submitFn, submitLoading, submitError }) {
    const dispatch = useDispatch()
    const roles = useSelector((store) => store.global.roles);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role_id: "3",
            store: {
                name: "",
                phone: "",
                tax_no: "",
                bank_account: ""
            }
        },
        mode: 'all',
    });

    let [passwordErrors, setPasswordErrors] = useState({
        kucuk: false,
        buyuk: false,
        rakam: false,
        special: false,
        boyut: false,
    })


    return (
        <>
            <form className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl" onSubmit={handleSubmit(submitFn)}>
                <div className="form-line">
                    <label className="input-label" htmlFor="name">
                        Name
                    </label>
                    <div>
                        <input
                            className="input-text"
                            id="name"
                            type="text"
                            placeholder='Name'
                            {...register('name', {
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name should be at least 3 character',
                                },
                            })}
                        />
                    </div>
                    {errors.name && (
                        <p className="input-error">{errors.name.message}</p>
                    )}
                </div>
                <div className="form-line">
                    <label className="input-label" htmlFor="email">
                        Email Address
                    </label>
                    <div>
                        <input
                            className="input-text"
                            id="email"
                            type="text"
                            placeholder='Email Address'
                            {...register('email', {
                                required: 'Email address is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email address is invalid"
                                }
                            })}
                        />
                    </div>
                    {errors.email && (
                        <p className="input-error">{errors.email.message}</p>
                    )}
                </div>
                <div className="form-line">
                    <label className="input-label" htmlFor="password">
                        Password
                    </label>
                    <div>
                        <input
                            className="input-text"
                            id="password"
                            type="password"
                            placeholder='Password'
                            {...register('password', {
                                required: 'At least eight character',
                                validate: (value) => {
                                    setPasswordErrors({
                                        ["kucuk"]: [/(?=.*[a-z])/].every((pattern) => pattern.test(value)),
                                        ["buyuk"]: [/(?=.*[A-Z])/].every((pattern) => pattern.test(value)),
                                        ["rakam"]: [/(?=.*\d)/].every((pattern) => pattern.test(value)),
                                        ["special"]: [/(?=.*[@#$%^&+=.\-_*])/].every((pattern) => pattern.test(value)),
                                        ["boyut"]: [/.{8,}$/].every((pattern) => pattern.test(value)),
                                    });
                                    if ([/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm].every((pattern) => pattern.test(value))) return delete errors.password
                                    else return "validate";
                                },
                            })}
                        />
                    </div>

                    {errors.password && (
                        errors.password.message === "validate" ? <div className='input-error'>
                            {!passwordErrors.boyut
                                ? <p>{passwordErrorsText[4]}</p>
                                : !(passwordErrors.kucuk && passwordErrors.buyuk && passwordErrors.rakam && passwordErrors.special)
                                    ? <div>
                                        <p className='text-gray'>{passwordErrors.kucuk ? <FontAwesomeIcon className='text-success-green w-5' icon="fa-solid fa-check" /> : <FontAwesomeIcon className='input-error w-5' icon="fa-solid fa-x" />} {passwordErrorsText[0]}</p>
                                        <p className='text-gray'>{passwordErrors.buyuk ? <FontAwesomeIcon className='text-success-green w-5' icon="fa-solid fa-check" /> : <FontAwesomeIcon className='input-error w-5' icon="fa-solid fa-x" />} {passwordErrorsText[1]}</p>
                                        <p className='text-gray'>{passwordErrors.rakam ? <FontAwesomeIcon className='text-success-green w-5' icon="fa-solid fa-check" /> : <FontAwesomeIcon className='input-error w-5' icon="fa-solid fa-x" />} {passwordErrorsText[2]}</p>
                                        <p className='text-gray'>{passwordErrors.special ? <FontAwesomeIcon className='text-success-green w-5' icon="fa-solid fa-check" /> : <FontAwesomeIcon className='input-error w-5' icon="fa-solid fa-x" />} {passwordErrorsText[3]}</p>
                                    </div>
                                    : ""
                            }
                        </div>
                            : <p className='input-error'>{errors.password.message}</p>
                    )
                    }
                </div>
                <div className="form-line">
                    <label className="input-label" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <div>
                        <input
                            className="input-text"
                            id="confirmPassword"
                            type="password"
                            placeholder='Confirm Password'
                            {...register('confirmPassword', {
                                required: 'Password is required',
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                }
                            })}
                        />
                    </div>

                    {errors.confirmPassword && (
                        <p className="input-error">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <div className="form-line">
                    <label className="input-label">Role</label>
                    <div className='flex flex-col text-gray'>
                        {roles.map((p) => (
                            <label className="input-checkbox " htmlFor={p.code} key={p.id}>
                                <input
                                    type="radio"
                                    id={p.code}
                                    value={p.id}
                                    checked={watch("role_id") === '' + p.id}
                                    className='mr-3'
                                />
                                {p.name}
                            </label>
                        ))}
                    </div>
                    {errors.people && (
                        <p className="input-error">{errors.role.message}</p>
                    )}
                    {watch("role_id") === "2" &&
                        <div className='flex flex-col gap-6 pt-6 items-center'>
                            <div className="form-line">
                                <label className="input-label" htmlFor="storeName">
                                    Store Name
                                </label>
                                <div>
                                    <input
                                        className="input-text"
                                        id="storeName"
                                        type="text"
                                        placeholder='Name'
                                        {...register('store.name', {
                                            required: 'Store Name is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Store Name should be at least 3 character',
                                            },
                                        })}
                                    />
                                </div>
                                {errors.store?.name && (
                                    <p className="input-error">{errors.store?.name.message}</p>
                                )}
                            </div>
                            <div className="form-line">
                                <label className="input-label" htmlFor="storePhone">
                                    Store Phone
                                </label>
                                <div>
                                    <input
                                        className="input-text"
                                        id="storePhone"
                                        type="text"
                                        placeholder='Phone'
                                        {...register('store.phone', {
                                            required: 'Store Phone is required',
                                            pattern: {
                                                value: /^(?:\+90.?5|0090.?5|905|0?5)(?:[01345][0-9])\s?(?:[0-9]{3})\s?(?:[0-9]{2})\s?(?:[0-9]{2})$/,
                                                message: "Store Phone is invalid"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.store?.phone && (
                                    <p className="input-error">{errors.store?.phone.message}</p>
                                )}
                            </div>
                            <div className="form-line">
                                <label className="input-label" htmlFor="storeTax">
                                    Store Tax ID
                                </label>
                                <div>
                                    <input
                                        className="input-text"
                                        id="storeTax"
                                        type="text"
                                        placeholder='Tax'
                                        {...register('store.tax_no', {
                                            required: 'Store Tax ID is required',
                                            pattern: {
                                                value: /T\d{4}V\d{6}/gm,
                                                message: "Store Tax ID is invalid (TXXXXTXXXXXX)"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.store?.tax_no && (
                                    <p className="input-error">{errors.store?.tax_no.message}</p>
                                )}
                            </div>
                            <div className="form-line">
                                <label className="input-label" htmlFor="storeIban">
                                    Store IBAN
                                </label>
                                <div>
                                    <input
                                        className="input-text"
                                        id="storeIban"
                                        type="text"
                                        placeholder='IBAN'
                                        {...register('store.bank_account', {
                                            required: 'Store IBAN is required',
                                            pattern: {
                                                value: /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|^PL\d{10}[0-9A-Z]{,16}n$|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/,
                                                message: "Store IBAN is invalid"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.store?.bank_account && (
                                    <p className="input-error">{errors.store?.bank_account.message}</p>
                                )}
                            </div>
                        </div>
                    }
                </div>
                <div className="form-line">
                    <div>
                        <button className="bg-primary-blue disabled:bg-gray text-white text-sm leading-7 py-2.5 px-12 rounded min-h-[50px] min-w-[150px] flex items-center justify-center" type="submit" disabled={(!isValid || submitLoading)}>
                            {submitLoading ? <Spinner className='w-5 h-5'>Loading...</Spinner> : "Sign Up"}
                        </button>
                        {submitError && <p className='input-error pt-3'>Register failed</p>}
                    </div>
                </div>
                <div className="form-line">
                    <div className='text-sm text-main'>Do you already have an account?<Link to="/login" className="text-primary-blue text-base">Login</Link></div>
                </div>
            </form>
        </>
    );
}