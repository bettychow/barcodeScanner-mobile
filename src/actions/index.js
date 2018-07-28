
export const UPC_FOUND = 'UPC_FOUND'
export const UPC_NOT_FOUND = 'UPC_NOT_FOUND'
export const findUPC = (upc) => {

  console.log('uuu', upc)
  return dispatch => {
    dispatch({
      type: UPC_FOUND
    })
  }
}