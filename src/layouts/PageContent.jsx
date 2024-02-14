import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../page/HomePage";
import ProductList from "../page/ProductList";
import AboutUs from "../page/AboutUs";

export default function PageContent() {

    return (
        <Switch>
            <Route path="/shop">
                <ProductList />
            </Route>
            <Route path="/about">
                <AboutUs />
            </Route>
            <Route exact path="/">
                <HomePage />
            </Route>
        </Switch>
    )
}