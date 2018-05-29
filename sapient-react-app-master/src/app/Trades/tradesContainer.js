import { connect } from 'react-redux'
import ViewTrades from "./viewTrades";



const mapStateToProps = state => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const tradesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTrades)

export default tradesList;