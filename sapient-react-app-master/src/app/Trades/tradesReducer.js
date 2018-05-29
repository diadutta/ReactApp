let initialState = [];
function trades(state = initialState, action) {
    switch (action.type) {
      case 'INITIALIZE':
        return Object.assign({}, state, {
          items: action.data,
          createTrade: true
        })
      case 'FETCH_TRADE_DETAILS':
      let selectedData;
         for (let i =0; i< state.items.length; i++){
           if(state.items[i].id === action.data){
             selectedData = state.items[i];
           }
         }
         return  Object.assign({}, state, {
          itemSelected: selectedData,
          createTrade: false,
          viewTrade: true
        })
      case 'UPDATE_TRADE': 
        let copiedState = Object.assign({}, state);
        for (let i =0; i< state.items.length; i++){
          if(state.items[i].id === action.data.id){
            copiedState.items[i] = action.data;
            copiedState.itemSelected = action.data;
            copiedState.viewTrade = true;
          }
        }
        return copiedState;
        case 'CREATE_TRADE':
          let copyState = Object.assign({}, state); 
          copyState.createTrade = true;
          copyState.itemSelected = {};
          return copyState;
        case 'CREATE_NEW_TRADE':
          let prevState = Object.assign({}, state);
          prevState.items.push(action.data);
          prevState.itemSelected = action.data;
          prevState.createTrade = false;
          prevState.viewTrade = true;
          return prevState;
        case 'VIEW':
          return Object.assign({}, state, {
            viewTrade: !state.viewTrade
          })
        case 'SEARCH_TRADE':
          let previousState = Object.assign({}, state); 
          previousState.items = action.data;
          return previousState;
        case 'DELETE_TRADE':
          let oldState = Object.assign({}, state);
          oldState.createTrade = true;
          oldState.viewTrade = false;
          oldState.itemSelected = {};
          oldState.items = _.filter(state.items, (item)=>{
             return item.id != action.data;
          });
          return oldState;
      default:
        return state
    }
  }
  export default trades;