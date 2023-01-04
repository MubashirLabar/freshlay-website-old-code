const initState = {
    hideSidebar: false,
    hideDialogbox: false,
    hidemap : false,
    adminSidebar: false,
    orderItems : []
}

const generalReducers = (state = initState, action) => {
    switch(action.type){
        case 'HIDE_SIDEBAR': 
            return {...state, hideSidebar: action.payload}
        case 'HIDE_Dialogbox': 
            return {...state, hideDialogbox: action.payload}
        case 'SAVE_ID': 
            return {...state, dialog_id : action.payload} 
        case 'HIDE_MAPBOX':
            return {...state, hidemap : action.payload}
        case "Orderitems" : 
            return {...state,orderItems : action.payload} 
        case "ADMIN_SIDEBAR" : 
            return {...state, adminSidebar : action.payload} 
        default:
            return state
    }    
}
 
export default generalReducers