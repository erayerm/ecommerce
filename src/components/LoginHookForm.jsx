import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { loginAction } from '../store/actions/UserActions';
import { Slide, toast } from 'react-toastify';



export default function LoginHookForm() {
    const [submitError, setSubmitError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    });
    const dispatch = useDispatch();

    const history = useHistory();
    const submitFn = (user) => {
        dispatch(loginAction(user, history, setSubmitError))
    }
    useEffect(() => {
        if (submitError) {
            setSubmitError(false);
            toast.error('Invalid username and password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Slide,
            });
        }
    }, [submitError])
    return (
        <>
            <form className="flex flex-col gap-6 mx-auto items-center p-5 bg-light-gray-1 rounded-3xl" onSubmit={handleSubmit(submitFn)}>
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
                                required: 'Enter your email address',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                    </div>
                    {errors.email && <p className="input-error">{errors.email.message}</p>}
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
                                required: 'Enter your password',
                            })
                            }
                        />
                    </div>
                </div>
                <div className="form-line">
                    <div>
                        <button className="bg-primary-blue disabled:bg-gray text-white text-sm leading-7 py-2.5 px-12 rounded min-h-[50px] min-w-[150px] flex items-center justify-center" type="submit" disabled={!isValid}>
                            Login
                        </button>
                        {submitError && <p className='input-error pt-3'>Invalid username and password</p>}
                    </div>
                </div>
                <div className="form-line">
                    <div className='text-sm text-main'>Do you have an account? <Link to="/signup" className="text-primary-blue text-base">Sign Up</Link></div>
                </div>
            </form>
        </>
    );
}