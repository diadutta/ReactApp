
import React, {Component} from "react";
import PropTypes from "prop-types";

export default class CartItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qty : props.item.qty
        }

        console.log("CartItem cons");
    }

    componentWillMount() {
        console.log("CartItems component will mount")
    }
    
    componentDidMount() {
        console.log("CarteItem did mount");
        this.input.focus();
    }

    onValueChange(e) {
        //input element (real DOM)
        let target = e.target;
        let value = target.value;
        console.log(value);

        this.setState( {
            qty: value
        });
    }
    
    render() {
        console.log("CartItem render");
        let {item} = this.props;

        return (
            <tr>
                <td>{item.name}</td>
                <td>
                    <input name="qty"
                           value={this.state.qty} 
                           ref={ (elem) => this.input = elem }
                           onChange= { (e) => this.onValueChange(e)}
                           
                    />
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.qty}</td>
                <td>
                        <button onClick={ () => this.props.onUpdate(item.id, this.state.qty) }>
                            Update
                        </button>

                        <button onClick={ () => this.props.onRemove(item.id) }>
                            Remove
                        </button>
                </td>
            </tr>
        )
    }
} 


CartItem.defaultProps = {
    
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        qty: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),

    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
}