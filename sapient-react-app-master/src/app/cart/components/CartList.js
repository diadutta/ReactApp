
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

export default class CartList extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("onRemove on list shoule ", nextProps.onRemove == this.props.onRemove)

    //     console.log("cart list should update");
    //     return nextProps.items != this.props.items;
    // }
    
    render() {
        
        console.log("CartList render");
        let {items} = this.props;

        return (
             <div>
              <table>
                  <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>

                    {
                       items.map ( item => (
                           <CartItem item={item}
                                     key={item.id}
                                     onRemove={this.props.onRemove}
                                     onUpdate={this.props.onUpdate}
                            >
                            </CartItem>
                       ))
                    }

                 </tbody>
              </table>
            </div>
        )
    }
} 


CartList.defaultProps = {
    
}

CartList.propTypes = {
    items: PropTypes.array,

    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
}