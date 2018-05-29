// bootstraping

import React from "react";

import {render} from "react-dom";
import { createStore } from 'redux';
import trades from './app/Trades/tradesReducer';
let store = createStore(trades);

//import {App} from "./app/App";

//bind virtual dom to real dom

//render => diffing, patching real dom

import Routes from "./app/Routes";

//import store from "./app/store";

render( <Routes store={store}/>, //virtual dom
        document.getElementById("root") //real dom
)