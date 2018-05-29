export function initalizeTrade(data) {
    return {
      type: 'INITIALIZE',
      data: data
    }
  }

export function fetchDetails(data) {
  return {
    type: 'FETCH_TRADE_DETAILS',
    data: data
  }
}

export function updateTradeDetails(data){
  return {
    type: 'UPDATE_TRADE',
    data: data
  }
}
export function createTrade(){
  return {
    type: 'CREATE_TRADE'
  }
}

export function createTradeDetails(data){
  return{
    type: 'CREATE_NEW_TRADE',
    data: data
  }
}
export function viewMode(){
  return{
    type: 'VIEW'
  }
}

export function searchTrade(data){
  return{
    type: 'SEARCH_TRADE',
    data: data

  }
}
export function deleteTrade(data){
  return{
    type: 'DELETE_TRADE',
    data: data
  }
}