
import React, {Component} from "react";
import PropTypes from "prop-types";
import ViewTrades from "./viewTrades";
import EditTrades from "./editTrades";
import SearchTrade from "./searchTrade";



export default class Trades extends Component {

    
    render() {
        
        console.log("Trades render");
        let store = this.props.store
        return (
            <div>
                <div className = "row space-bottom">
                    <div className = "col-sm-12">
                        <SearchTrade store={store}></SearchTrade>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <ViewTrades store={store}></ViewTrades>
                    </div>
                    <div className="col-sm-4 border-edit-trades ">
                        <EditTrades store={store}></EditTrades>
                    </div>
                </div>
            </div>
        )
    }
} 


Trades.defaultProps = {
    
}

Trades.propTypes = {
    
}