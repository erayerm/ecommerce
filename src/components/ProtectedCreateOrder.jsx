import { useSelector } from "react-redux";
import CreateOrder from "../page/CreateOrder";
import Login from "../page/Login";

export default function ProtectedCreateOrder() {
    const isLoggedIn = useSelector(store => store.user.user)
    return Object.keys(isLoggedIn).length !== 0
        ? <CreateOrder />
        : <Login />
}