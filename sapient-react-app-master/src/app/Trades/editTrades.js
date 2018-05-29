
import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TradesActionCreater from './tradesActionCreater';
import DatePicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
  





class EditTrades extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.handleDate = this.handleDate.bind(this);
        
            

        const {dispatch} = props.store;
        this.obj ={
            commodity: {},
            counterparty: {},
            location: {}}
        this.editItem = _.cloneDeep(this.obj) ;
        

   

    this.boundActionCreators = bindActionCreators(TradesActionCreater, dispatch);
    this.moment =  moment;
    }

    edit(){
        if (this.props.createTrade){
            return;
        }
        let { dispatch } = this.props.store;
        dispatch(TradesActionCreater.viewMode());
        
    }
   
    

    cancel(){
        let { dispatch } = this.props.store;
        dispatch(TradesActionCreater.viewMode());
       
    }
    isFormValid(){
        let fields = ["tradeDate", "commodity", "side", "location", "quantity", "price", "counterparty"];
        let isValid = fields.every((item)=>{
            return(!_.isEmpty(this.editItem[item]) || this.editItem[item]);
        });
        return isValid;
    }

    save(data){
        let { dispatch } = this.props.store;
        let validForm = this.isFormValid();
        if (data.id && validForm){
            fetch('trade/edit/' + data.id, {
               method: 'PUT',
               mode: 'CORS',
               body: JSON.stringify(data),
               headers: {
                   'Content-Type': 'application/json'
               }
           }).then(response => response.json())
           .then(json => {
               dispatch(TradesActionCreater.updateTradeDetails(json));
            });
        }else if (validForm){
            fetch('/trade/create', {
                method: 'POST',
                mode: 'CORS',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(json => {
                dispatch(TradesActionCreater.createTradeDetails(json));
             });
        }
       
    }
    onButtonClicked(field){
        this.editItem.side = field;
        this.setState({});
        
    }
    handleDate(value){
      this.editItem.tradeDate = this.moment(value).format('MM/DD/YYYY');
      this.setState({});
    }
    
    handleChange(evt){
        if (evt.target.id === 'commodity'){
            let selectedValue = _.filter(this.commodities, (item)=>{
                return evt.target.value == item.id
            })
            this.editItem[evt.target.id] = selectedValue[0];
        }else if (evt.target.id === 'counterparty'){
            let selectedValue = _.filter(this.counterparties, (item)=>{
                return evt.target.value == item.id
            })
            this.editItem[evt.target.id] = selectedValue[0];
        }else if (evt.target.id === 'location'){
            let selectedValue = _.filter(this.locations, (item)=>{
                return evt.target.value == item.id
            })
            this.editItem[evt.target.id] = selectedValue[0];
        }else {
            this.editItem[evt.target.id] = evt.target.value;
        }
        this.setState({});
        
    }
    
    checkForNumber(e) {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }

    componentWillReceiveProps(props){
        let obj = {
            commodity: {},
            counterparty: {},
            location: {}
        }
        this.editItem = Object.assign(obj, props.item)|| obj;
    }

    remove(){
        let { dispatch } = this.props.store;
        if(this.editItem.id && this.props.viewTrade){
            let url = '/trade/delete/' + this.editItem.id;
            fetch(url)
            .then(response => response.json())
            .then(json => {
            dispatch(TradesActionCreater.deleteTrade(this.editItem.id));
        });
        }
    }

    componentDidMount() {
        
         fetch('/refData/commodity')
         .then(response => response.json())
         .then(json => {
             
        this.commodities = json;
        this.setState({});

       });
       fetch('/refData/counterparty')
         .then(response => response.json())
         .then(json => {
             
        this.counterparties = json;
        this.setState({});

       });
       fetch('/refData/location')
         .then(response => response.json())
         .then(json => {
             
        this.locations = json;
        this.setState({});

       });
       
       
     }

     

   

    render() {
        
        console.log("Trades render");
        let obj = {
            commodity: {},
            counterparty: {},
            location: {}
        }
        let item = this.props.item || obj;
        let commodities = this.commodities || [];
        let counterparties = this.counterparties || [];
        let locations = this.locations || [];
        
        let editTrade = (this.props.viewTrade && !this.props.createTrade)?  <div className ="space-top"><div className="row space-bottom">
            <div className="col-sm-3">
            Trade Date
            </div>
            <div className="col-sm-3">
                {item.tradeDate}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Commodity
            </div>
            <div className="col-sm-3">
                {item.commodity.name}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Side
            </div>
            <div className="col-sm-3">
                {item.side}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Quantity
            </div>
            <div className="col-sm-3">
                {item.quantity}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Price
            </div>
            <div className="col-sm-3">
                {item.price}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Counterparty
            </div>
            <div className="col-sm-3 ">
                {item.counterparty.name}
            </div>
        </div>
        <div className="row space-bottom">
            <div className="col-sm-3">
            Location
            </div>
            <div className="col-sm-3">
                {item.location.name}
            </div>
        </div></div> : <div className = "row space-top">
                <div className = "col-sm-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-sm-3 text-left label-margin"><strong>TradeDate</strong></div>
                        <div className="col-sm-8 edit-date">
                        
                            <DayPickerInput
                           formatDate={formatDate}
                            parseDate={parseDate}
                            value={this.editItem.tradeDate}
                            placeholder={`${formatDate(new Date())}`}
                            onDayChange ={this.handleDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                    <div className="col-sm-3 text-left label-margin"><strong>Commodity</strong></div>
                        <div className="col-sm-8">
                            <select onChange={this.handleChange} 
                             id = "commodity" className="form-control" value={this.editItem.commodity.id}>
                               <option key={"myKey" + 0}>select</option> 
                             {commodities.map( commodityItem => (
                                <option value={commodityItem.id} key={"myKey" + commodityItem.id}>{commodityItem.name}</option>
                            ))}
                            </select>
                            
                        </div>
                      
                    </div>
                    <div className="form-group">
                    <div className="col-sm-3 text-left label-margin"><strong>Side</strong></div>
                        <div className="col-sm-8 radio-space-top"> 
                        <label className="radio-inline">
                                <input 
                                type="radio" 
                                id = "side"
                                checked={this.editItem.side === 'BUY'}
                                onChange={()=>this.onButtonClicked("BUY")}/>BUY
                            </label>
                            <label className="radio-inline">
                                <input 
                                type="radio" 
                                id = "side" 
                                checked={this.editItem.side === 'SELL'}
                                onChange={()=>this.onButtonClicked("SELL")}/>SELL
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-3 text-left label-margin"><strong>counterparty</strong></div>
                        <div className="col-sm-8">          
                        <select onChange={this.handleChange} 
                             id = "counterparty" className="form-control" value={this.editItem.counterparty.id}>
                            <option key={"myKey" + 0}>select</option> 
                             {counterparties.map( counterpartyItem => (
                                <option value={counterpartyItem.id} key={"myKey" + counterpartyItem.id}>{counterpartyItem.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-3 text-left label-margin"><strong>Price</strong></div>
                        <div className="col-sm-5">          
                            <input className="form-control"
                            id ="price"
                            onKeyPress ={this.checkForNumber}
                            defaultValue = {this.editItem.price}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col-sm-4 radio-space-top">
                        USD
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-3 text-left label-margin"><strong>Quantity</strong></div>
                        <div className="col-sm-5">          
                            <input  className="form-control"
                            id = "quantity"
                            onKeyPress ={this.checkForNumber}
                            defaultValue = {this.editItem.quantity}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col-sm-4 radio-space-top">
                        MT
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-3 text-left label-margin"><strong>Location</strong></div>
                        <div className="col-sm-8">          
                            <select onChange={this.handleChange} 
                             id = "location" className="form-control" value={this.editItem.location.id}>
                               <option key={"myKey" + 0}>select</option> 
                             {locations.map( locationItem => (
                                <option value={locationItem.id} key={"myKey" + locationItem.id}>{locationItem.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>

                   
                    
                </form>
                <div className="row">
                        <div className="col-sm-offset-6 col-sm-6 text-right space-bottom space-top">
                        <span className="space-right"><button className="btn " onClick={() => this.cancel()}>Cancel</button></span>
                        <span><button  className="btn" onClick={() => this.save(this.editItem)}>Save</button></span>
                        
                        
                        </div>
                    </div>
                </div>
            </div>
       
        return (
            <div >
            
            <div className="row label-padding  background-color-label">
                <div className="col-sm-10 ">
                <strong>Trade ID : {item.id}</strong>
                </div>
                <div className="col-sm-1" onClick={() => this.edit()} >
                <i className="far fa-edit"></i>
                </div>
                <div className="col-sm-1" onClick={() => this.remove()} >
                <i className="fa fa-trash"></i>
                </div>
            </div>
            {editTrade}
            
            </div>
             
        )
    }
} 


EditTrades.defaultProps = {
    
}

const mapStateToProps = state => {
    return {
      item: state.itemSelected,
      createTrade: state.createTrade,
      viewTrade: state.viewTrade
    }
}
  
export default connect(mapStateToProps)(EditTrades);