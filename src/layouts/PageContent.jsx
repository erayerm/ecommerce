import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../page/HomePage";
import ProductList from "../page/ProductList";
import AboutUs from "../page/AboutUs";
import Team from "../page/Team";
import Contact from "../page/Contact";
import ProductPage from "../page/ProductPage";
import SignUp from "../page/SignUp";
import Login from "../page/Login";

export default function PageContent() {

    return (
        <Switch>
            <Route path={["/shop/:gender/:category", "/shop"]}>
                <ProductList />
            </Route>
            <Route path="/productPage">
                <ProductPage />
            </Route>
            <Route path="/about">
                <AboutUs />
            </Route>
            <Route path="/team">
                <Team />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
        </Switch>
    )
}