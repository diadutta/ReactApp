import React, {Component} from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import * as TradesActionCreater from './tradesActionCreater';

import DatePicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
  

export default class SearchTrade extends Component{
    constructor(props) {
        super(props);
        const {dispatch} = props.store;
        this.onInputChange = this.onInputChange.bind(this);
        this.clear = this.clear.bind(this);
        this.handletoDate = this.handletoDate.bind(this);
        this.handleFromDate = this.handleFromDate.bind(this);
        this.boundActionCreators = bindActionCreators(TradesActionCreater, dispatch);
        this.fields = ["fromDate", "toDate", "side", "commodity","counterparty", "location"];
        this.state = {
            fields: {
                commodity:{},
                counterparty:{},
                location:{}
            }
        };
        this.moment =  moment;
    }

    isFormValid(data){
        let validForm = false
        let validationData = {
            fromDate: data.fromDate,
            toDate: data.toDate,
            commodity: data.commodity.id,
            counterparty: data.counterparty.id,
            location: data.location.id,
            side: data.side[0]
        };
        this.fields.forEach((item)=>{
           if(validationData[item] && validationData[item] !== ""){
               validForm = true;
           }
        });
       return validForm;
    }

    searchTrade(){
        const {dispatch} = this.props.store;
        let postData = {
            fromDate: this.state.fields.fromDate,
            toDate: this.state.fields.toDate,
            commodity: this.state.fields.commodity,
            counterparty: this.state.fields.counterparty,
            location: this.state.fields.location,
            side: []
        };
        if(this.state.fields.buy){
            postData.side.push("BUY");
        }
        if(this.state.fields.sell){
            postData.side.push("SELL");
        }
        let isValid = this.isFormValid(postData);
        fetch('/trade/search', {  
            method: 'POST',
            mode: 'CORS',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(json => {
        dispatch(TradesActionCreater.searchTrade(json));
      });
      this.clear();

    }
    handletoDate(value){
        let values = this.state.fields;
       
        values.toDate = this.moment(value).format('MM/DD/YYYY');
        this.setState({fields: values});
      }

    handleFromDate(value){
        let values = this.state.fields;
       
        values.fromDate = this.moment(value).format('MM/DD/YYYY');
        this.setState({fields: values});
    }

    onInputChange(evt){
        let values = this.state.fields;
        if (evt.target.id === 'commodity'){
            let selectedValue = _.filter(this.commodities, (item)=>{
                return evt.target.value == item.id
            })
            values[evt.target.id] = selectedValue[0];
        }else if (evt.target.id === 'location'){
            let selectedValue = _.filter(this.locations, (item)=>{
                return evt.target.value == item.id
            })
            values[evt.target.id] = selectedValue[0];
        }else if (evt.target.id === 'counterparty'){
            let selectedValue = _.filter(this.counterparties, (item)=>{
                return evt.target.value == item.id
            })
            values[evt.target.id] = selectedValue[0];

        }else{
            //values[evt.target.id] = evt.target.value;
            values[evt.target.id]  = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        }
        this.setState({fields: values})
    }

    clear(){
        
        this.setState({fields: {
            fromDate: "",
            toDate: "",
            counterparty: {id : ""},
            buy: false,
            sell: false,
            location: {id : ""},
            commodity: {
                id: ""
            }
        }});
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
   
    
    render(){
        let commodities = this.commodities || [];
        let counterparties = this.counterparties || [];
        let locations = this.locations || [];
        return(
            <div className="border-search-trade">
                <form>
                    <div className = "row">
                        <div className ="col-sm-3">
                            Trade Date
                        </div>
                        <div className="col-sm-1">
                            Commodity
                        </div>
                        <div className="col-sm-2">
                            side
                        </div>
                        <div className="col-sm-2">
                            Counterparty
                        </div>
                        <div className="col-sm-2">
                            Location
                        </div>
                        <div className="col-sm-2">
                            {this.state.fields.fromDate}
                        </div>
                    </div>
                    <div className = "row">
                        <div className ="col-sm-3">
                            <div className = "row">
                                <div className = "col-sm-5 date">
                                
                                    <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    value={this.state.fields.fromDate}
                                    placeholder={`${formatDate(new Date())}`}
                                    onDayChange ={this.handleFromDate}
                                    inputProps={{ style: { width: 100} }}/>
                                </div>
                                <div className = "col-sm-2 date">
                                    to
                                </div>
                                <div className = "col-sm-5 date">
                                   <DayPickerInput
                           formatDate={formatDate}
                            parseDate={parseDate}
                            value={this.state.fields.toDate}
                            placeholder={`${formatDate(new Date())}`}
                            onDayChange ={this.handletoDate}
                            inputProps={{ style: { width: 100 } }}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1">
                              
                              
                                 <select onChange={this.onInputChange} 
                                    id = "commodity" className="form-control form-control-color" value= {this.state.fields.commodity.id}>
                                    <option key={"myKey" + 0}>select</option>  
                                    {commodities.map( commodityItem => (
                                        <option value={commodityItem.id} key={"myKey" + commodityItem.id}>{commodityItem.name}</option>
                                    ))}
                                </select>
                        </div>
                        <div className="col-sm-2 checkbox-space-top">
                        
                                <label className="checkbox-inline">
                                <input
                                id="buy"
                                type="checkbox"
                                checked={this.state.fields.buy}
                                onChange={this.onInputChange} />
                                Buy
                                </label>
                                <label className="checkbox-inline">
                                <input
                                id="sell"
                                type="checkbox"
                                checked={this.state.fields.sell}
                                onChange={this.onInputChange} />
                                Sell
                                </label>
                        </div>
                        <div className="col-sm-2">
                        <select onChange={this.onInputChange} 
                                    id = "counterparty" className="form-control form-control-color" value= {this.state.fields.counterparty.id}> 
                                    <option key={"myKey" + 0}>select</option>   
                                    {counterparties.map( counterpartyItem => (
                                        <option value={counterpartyItem.id} key={"myKey" + counterpartyItem.id}>{counterpartyItem.name}</option>
                                    ))}
                                </select>
                        </div>
                        <div className="col-sm-2">
                        <select onChange={this.onInputChange} 
                                    id = "location" className="form-control form-control-color" value= {this.state.fields.location.id}>
                                    <option key={"myKey" + 0}>select</option>   
                                    {locations.map( locationItem => (
                                        <option value={locationItem.id} key={"myKey" + locationItem.id}>{locationItem.name}</option>
                                    ))}
                                </select>
                        </div>
                        <div className="col-sm-2">
                            
                        </div>
                    </div>
                </form>
                <div className ="row">
                    <div className = "col-sm-offset-6 col-sm-6 text-right">
                        <button className = "btn space-right form-control-color" onClick = {this.clear}><strong>Clear</strong></button>
                        <button className = "btn form-control-color" onClick = {() => this.searchTrade()}><strong>Search</strong></button>
                    </div>
                </div>
            </div>
        )
    }
}