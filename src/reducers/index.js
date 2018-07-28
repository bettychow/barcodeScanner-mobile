import { combineReducers } from 'redux';
import { UPC_FOUND, UPC_NOT_FOUND } from '../actions'

const findUPC = (state = {upcExists: null}, action) => {
    switch(action.type) {
      case UPC_FOUND:
        return {
          ...state,
          upcExists: true
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