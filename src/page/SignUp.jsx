import { useState } from "react";
import SignUpHookForm from "../components/SignUpHookForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Slide, toast } from "react-toastify";
import { instance } from "../instance";

export default function SignUp() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const history = useHistory();

    const handleSighUpSubmit = (data) => {
        if (data.role_id !== "2") delete data.store;
        delete data.confirmPassword;
        setSubmitLoading(true);
        setSubmitError(false);
        instance.post("/signup", data)
            .then(() => setSubmitLoading(false))
            .then(() => {
                if (history.action === 'POP') {
                    history.push('/');
                } else {
                    history.goBack();
                }
            })
            .then(() => toast.success('You need to click link in email to activate your account!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }))
            .catch((err) => {
                console.error(err);
                setSubmitLoading(false);
                setSubmitError(true);
            })
    }

    return (
        <div className="w-screen">
            <div className="max-w-page-content mx-auto">
                <SignUpHookForm submitFn={handleSighUpSubmit} submitLoading={submitLoading} submitError={submitError} />
            </div>
        </div>
    )
}