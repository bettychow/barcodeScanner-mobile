import { combineReducers } from 'redux';
import { UPC_FOUND, UPC_NOT_FOUND } from '../actions'

const findUPC = (state = {upcExists: null, product_name: '', upc: ''}, action) => {
    switch(action.type) {
      case UPC_FOUND:
        return {
          ...state,
          upcExists: true,
          product_name: action.payload.product_name,
          upc: action.payload.upc
        }
      case UPC_NOT_FOUND:
        return {
          ...state,
          upcExists: false
        }
      default: 
        return state
    }
}

export default combineReducers({
  findUPC
})