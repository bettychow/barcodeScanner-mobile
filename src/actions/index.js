
export const UPC_FOUND = 'UPC_FOUND'
export const UPC_NOT_FOUND = 'UPC_NOT_FOUND'
export const findUPC = (code) => {

  return async dispatch => {

    const trimedCode = code.length > 10? code.slice(1): code
    const response = await fetch(`https://young-woodland-38521.herokuapp.com/upc/${trimedCode}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    const JSONres = await response.json()

    if(JSONres[0]) {
      dispatch({
        type: UPC_FOUND,
        payload: JSONres[0]
      })
    } else {
      dispatch({
        type: UPC_NOT_FOUND,
        payload: JSONres[0]
      })
    }
  }
}