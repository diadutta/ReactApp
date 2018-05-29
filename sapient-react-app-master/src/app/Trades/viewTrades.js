
import React, {Component} from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import * as TradesActionCreater from './tradesActionCreater';



class ViewTrades extends Component {
    constructor(props) {
        super(props);
        

    const {dispatch} = props.store;

   

    this.boundActionCreators = bindActionCreators(TradesActionCreater, dispatch);

        this.state = {
           items: []
        }
    }
    
    displayTrade(id){
        let { dispatch } = this.props.store;
        dispatch(TradesActionCreater.fetchDetails(id));
    }

    createTrade(){
        if (this.props.viewTrade){
            let { dispatch } = this.props.store;
            dispatch(TradesActionCreater.createTrade());
        }else {
            return;
        }
       
    }
    componentDidMount() {
       let { dispatch } = this.props.store;
    
        fetch('/trade/getAll')
        .then(response => response.json())
        .then(json => {
        console.log(json);
            this.setState({
            items: json
            });
        dispatch(TradesActionCreater.initalizeTrade(json));
      });
    }
   

    
    render() {
        let items = this.props.items || [];
       // let displayTrade = this.displayTrade;
        return (
           <div className="row">
           <div className="col-sm-12">
                <div className="table-responsive table-bordered-view ">          
                <table className="table">
                <thead>
                    <tr>
                    <th>Trade Date</th>
                    <th>Commodity</th>
                    <th>Side</th>
                    <th>Qty(MT)</th>
                    <th>Price(/MT)</th>
                    <th>counterparty</th>
                    <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                {
                        items.map ( item => (
                            <tr onClick={() => this.displayTrade(item.id)} key={'mykey' + item.id}>
                            <td>{item.tradeDate}</td>
                            <td>{item.commodity.name}</td>
                            <td>{item.side}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.counterparty.name}</td>
                            <td>{item.location.name}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
                </table>
                </div>
                <div className = "row ">
                    <div className = "col-sm-12" >
                    <a onClick= {() => this.createTrade()} className="image-plus">
                        <i className="fa fa-plus-circle fa-3x"></i>
                    </a>
                    </div>
                </div>
            </div>
            </div>
  
          
        )
    }
} 


ViewTrades.defaultProps = {
    
}

ViewTrades.propTypes = {
    
}
const mapStateToProps = state => {
    return {
      items: state.items,
      viewTrade: state.viewTrade,
      createTrade: state.createTrade
    }
  }
  
  export default connect(mapStateToProps)(ViewTrades);

