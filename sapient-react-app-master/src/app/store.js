
import {createStore, combineReducers} from "redux";

function counterReducer(state = 0, action) {
    console.log("counter Reducer", state, action);

    switch(action.type) {
        case "INCREMENT":
            return state + action.payload.value
        
        case "DECREMENT": 
            return state - action.payload.value

        case "RESET":
            return 0

        default:    
            return state;
    }
}

let rootReducer = combineReducers({
    //key: reducer Function
    counter: counterReducer
    //cartItems: cartReducer
})

let store = createStore(rootReducer);

export default store;

///------ LEARNING PURPOSE


console.log("Initial state ", store.getState());

store.subscribe (function callback() {
    console.log("SUBSCRIBE")
});

import {incrementAction} from "./actions";

//ACTION is an object
// let action = {
//     type: "INCREMENT",
//     payload: {
//         value: 1
//     }
// }

let action = incrementAction(1);

console.log("DISPATCH");
//calls reducers
store.dispatch(action);

console.log("state ", store.getState());

//store.dispatch(action);
