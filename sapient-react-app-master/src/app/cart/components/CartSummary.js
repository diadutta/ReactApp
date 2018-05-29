
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class CartSummary extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log("summary receive next props", nextProps);
        console.log("summary current props", this.props);
    }

    //NOT Needed for PureComponent

    //called on parent render
    //current component this.setState
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("cart summary should update");
    //     //return true, calls render, else no render call
    //     return nextProps.count != this.props.count ||
    //            nextProps.amount != this.props.amount
    // }
    
    render() {
        console.log("CartSummary render");
        let {count, amount} = this.props;

        return (
            <div> 
            <h2>Cart Summary</h2>

            <p> Count: {count} </p>
            <p> Amount: {amount} </p>
            
            </div>
        )
    }
} 


CartSummary.defaultProps = {
    
}

CartSummary.propTypes = {
    count: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
}