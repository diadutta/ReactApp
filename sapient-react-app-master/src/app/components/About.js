
import React, {Component} from "react";
import PropTypes from "prop-types";

import Like from "./Like";

import store from "../store";
import {incrementAction} from "../actions";

export default class About extends Component {
    constructor(props) {
        super(props);

        //state is a keyword
        this.state = {
            name: '',
            members: ['Member 1', "Member 1"],
            showList: true,
            aboutLikes: 10000
        }
    }

    componentDidMount() {
        
    }
    
    addMember() {
        //Mutable
        this.state.members.push("Member " + Math.random());
        this.forceUpdate();
    }

    showHide() {
        //keyword
        //set the state and calls render
        //async 
        //merge with original state
        
        console.log("showList before ", this.state.showList)

        this.setState({
            showList : !this.state.showList
        }, () => {
            console.log("set state callback ")
            console.log("showList at callback ", this.state.showList)
        })

        this.setState({
            flag : true
        })

        this.setState({
            flag : !this.state.flag
        })

        console.log("showList after ", this.state.showList)
        
    }

    increment() {
        
        this.setState({
            aboutLikes:  this.state.aboutLikes + 1
        })

        // let action = {
        //     type: 'INCREMENT',
        //     payload: {
        //         value: 1
        //     }
        // }

        let action = incrementAction(1);

        store.dispatch(action);
    }

    render() {
        console.log("About render");

        return (
            <div> 
            <h2>About</h2>
            {/* comments */}

            <Like likes={this.state.aboutLikes}
                  onIncr={(n) => this.increment(n) 
                  
                }

            >
            </Like>

            <button onClick={() => this.showHide()} >
                {this.state.showList? "Hide" : "Show" }
            </button>

            <button onClick={() => this.addMember()} >
                Add
            </button>

            { this.state.showList && 
                <ul>
                    
                    { this.state.members.map ( (m, i) => <li key={i}>{m}</li>) }
                </ul>
            }

            </div>
        )
    }
} 


About.defaultProps = {
    
}

About.propTypes = {
    
}