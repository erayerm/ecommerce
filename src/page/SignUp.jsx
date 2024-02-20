import axios from "axios";
import { useEffect, useState } from "react";
import SignUpHookForm from "../components/SignUpHookForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Slide, toast } from "react-toastify";


const instance = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com"
});

export default function SignUp() {
    const [roles, setRoles] = useState([]);
    const [roleLoading, setRoleLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const history = useHistory();
    useEffect(() => {
        instance.get("/roles")
            .then((res) => setRoles(res.data))
            .then(() => setRoleLoading(false))
            .catch((err) => console.error(err))
    }, [])

    const handleSighUpSubmit = (data) => {
        if (data.role_id !== "2") delete data.store;
        delete data.confirmPassword;
        setSubmitLoading(true);
        setSubmitError(false);
        instance.post("/signup", data)
            .then(() => setSubmitLoading(false))
            .then(() => history.goBack())
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



    if (roleLoading) return <p>Loading...</p>

    return (
        <div className="w-screen">
            <div className="max-w-page-content mx-auto">
                {console.log(roles)}
                <SignUpHookForm roles={roles} submitFn={handleSighUpSubmit} submitLoading={submitLoading} submitError={submitError} />
            </div>
        </div>
    )
}