import React, {Component} from "react";

import PropTypes from "prop-types";

import {NavLink} from "react-router-dom";

import store from "../store";

export default class Header extends Component {
    constructor(props) {
        super(props);
        console.log("title ", props.title)
    }

    //ES.next, .babelrc stage-2 preset
    static propTypes = {
        title: PropTypes.string
    }

    componentDidMount() {
        store.subscribe( ()=> {
            //calls render
            this.forceUpdate();
        })
    }

    render() {
        let state = store.getState();

        return (
            
            <div>
                <nav className="navbar navbar-default">
  <div className="container-fluid">
    
    <ul className="nav navbar-nav">
      
      <li><NavLink to="/trades" exact>
                    Trades 
                </NavLink></li>
      <li><NavLink to="/transfers">
                    Transfers
                </NavLink></li>
      <li><NavLink to="/transport">
                    Transports
                </NavLink></li>
    </ul>
  </div>
</nav>
               


                

               

                
            </div>
        )    
    }
}

