import React from "react";

import {
    BrowserRouter as Router, 
    Switch,
    Route
} from "react-router-dom";

import {App} from "./App";

import Home from "./components/Home";
import About from "./components/About";
import Cart from "./cart/components/Cart";
import Trades from "./Trades/trades";

import NotFound from "./components/NotFound";

export default function Routes(props) {
    return (
        <Router>
            <App store={props.store}>
                <Switch>
                    <Route path="/trades" exact component={() => (<Trades store={props.store} />)} />
                    <Route path="/transfers" component={About} />
                    <Route path="/transports" component={Cart} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </App>
        </Router>
    )
}