import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../page/HomePage";
import ProductList from "../page/ProductList";

export default function PageContent() {

    return (
        <Switch>
            <Route path="/shop">
                <ProductList />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    )
}
