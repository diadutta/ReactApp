
//import from node_modules
import React from "react";

//default import
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";

import Cart from "./cart/components/Cart";

export class App extends React.Component {
    //keyword
    //return a virtual DOM
    render() {
        //JSX
        return (
            <div>
                <Header/>
                
                {/* view container */}
                <div className= "container-fluid">
                     {this.props.children}
                </div>
            </div>
        )
        
    }
}