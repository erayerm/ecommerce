import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../page/HomePage";
import ProductList from "../page/ProductList";
import AboutUs from "../page/AboutUs";
import Team from "../page/Team";
import Contact from "../page/Contact";

export default function PageContent() {

    return (
        <Switch>
            <Route path="/shop">
                <ProductList />
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
            <Route exact path="/">
                <HomePage />
            </Route>
        </Switch>
    )
}